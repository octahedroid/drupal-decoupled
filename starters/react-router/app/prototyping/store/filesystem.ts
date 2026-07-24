import { mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { randomUUID } from "node:crypto";

import type {
  AppendPrototypeVersionInput,
  CreatePrototypeInput,
  PrototypeRecord,
  PrototypeStore,
} from "~/prototyping/store/types";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface FilesystemPrototypeStoreOptions {
  baseDir?: string;
  now?: () => Date;
}

function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

function createRecord({
  id,
  sourcePath,
  message,
  label,
  now,
}: {
  id: string;
  sourcePath: string;
  message?: string;
  label?: string;
  now: Date;
}): PrototypeRecord {
  return {
    id,
    sourcePath,
    createdAt: now.toISOString(),
    pendingMessage: message,
    label,
    versions: [],
  };
}

export class FilesystemPrototypeStore implements PrototypeStore {
  private readonly baseDir: string;

  private readonly now: () => Date;

  constructor(options: FilesystemPrototypeStoreOptions = {}) {
    this.baseDir = resolve(options.baseDir ?? resolve(process.cwd(), ".prototypes"));
    this.now = options.now ?? (() => new Date());
  }

  async create(input: CreatePrototypeInput): Promise<PrototypeRecord> {
    const record = createRecord({
      id: randomUUID(),
      sourcePath: input.sourcePath,
      message: input.message,
      label: input.label,
      now: this.now(),
    });

    await this.writeRecord(record);

    return record;
  }

  async get(id: string): Promise<PrototypeRecord | null> {
    const filePath = this.resolveRecordPath(id);

    try {
      const file = await readFile(filePath, "utf8");
      return this.parseRecord(file, id);
    } catch (error) {
      if (isMissingFileError(error)) {
        return null;
      }

      throw error;
    }
  }

  async list(): Promise<PrototypeRecord[]> {
    await this.ensureBaseDir();

    const entries = await readdir(this.baseDir, { withFileTypes: true });

    const records = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map(async (entry) => {
          const id = entry.name.replace(/\.json$/, "");
          const filePath = this.resolveRecordPath(id);
          const file = await readFile(filePath, "utf8");

          return this.parseRecord(file, id);
        }),
    );

    return records.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  async appendVersion(
    id: string,
    version: AppendPrototypeVersionInput,
  ): Promise<PrototypeRecord> {
    const record = await this.get(id);

    if (!record) {
      throw new Error(`Prototype not found: ${id}`);
    }

    const nextRecord: PrototypeRecord = {
      ...record,
      pendingMessage: undefined,
      versions: [
        ...record.versions,
        {
          spec: version.spec,
          message: version.message,
          timestamp: this.now().toISOString(),
        },
      ],
    };

    await this.writeRecord(nextRecord);

    return nextRecord;
  }

  private async ensureBaseDir(): Promise<void> {
    await mkdir(this.baseDir, { recursive: true });
  }

  private resolveRecordPath(id: string): string {
    if (!isUuid(id)) {
      throw new Error(`Invalid prototype id: ${id}`);
    }

    const filePath = resolve(this.baseDir, `${id}.json`);

    if (!filePath.startsWith(`${this.baseDir}/`) && filePath !== `${this.baseDir}.json`) {
      throw new Error(`Prototype id resolves outside store directory: ${id}`);
    }

    return filePath;
  }

  private parseRecord(file: string, id: string): PrototypeRecord {
    try {
      return JSON.parse(file) as PrototypeRecord;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Prototype record ${id} contains invalid JSON: ${message}`);
    }
  }

  private async writeRecord(record: PrototypeRecord): Promise<void> {
    await this.ensureBaseDir();

    const filePath = this.resolveRecordPath(record.id);
    const tempFilePath = join(
      dirname(filePath),
      `${record.id}.${randomUUID()}.tmp`,
    );

    await writeFile(tempFilePath, JSON.stringify(record, null, 2), "utf8");

    try {
      await rename(tempFilePath, filePath);
    } catch (error) {
      await rm(tempFilePath, { force: true }).catch(() => undefined);
      throw error;
    }
  }
}

function isMissingFileError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}
