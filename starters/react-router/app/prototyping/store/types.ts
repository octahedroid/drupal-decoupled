import type { Spec } from "@json-render/core";

export interface PrototypeVersion {
  spec: Spec;
  message: string;
  timestamp: string;
}

export interface PrototypeRecord {
  id: string;
  sourcePath: string;
  createdAt: string;
  pendingMessage?: string;
  versions: PrototypeVersion[];
}

export interface CreatePrototypeInput {
  sourcePath: string;
  message?: string;
}

export interface AppendPrototypeVersionInput {
  spec: Spec;
  message: string;
}

export interface PrototypeStore {
  create(input: CreatePrototypeInput): Promise<PrototypeRecord>;
  get(id: string): Promise<PrototypeRecord | null>;
  list(): Promise<PrototypeRecord[]>;
  appendVersion(
    id: string,
    version: AppendPrototypeVersionInput,
  ): Promise<PrototypeRecord>;
}
