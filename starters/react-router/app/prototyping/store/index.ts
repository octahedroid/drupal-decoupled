import { FilesystemPrototypeStore } from "~/prototyping/store/filesystem";
import type { PrototypeStore } from "~/prototyping/store/types";

let prototypeStore: PrototypeStore | undefined;

export function getPrototypeStore(): PrototypeStore {
  prototypeStore ??= new FilesystemPrototypeStore();

  return prototypeStore;
}

export { FilesystemPrototypeStore };
export type {
  AppendPrototypeVersionInput,
  CreatePrototypeInput,
  PrototypeRecord,
  PrototypeStore,
  PrototypeVersion,
} from "~/prototyping/store/types";
