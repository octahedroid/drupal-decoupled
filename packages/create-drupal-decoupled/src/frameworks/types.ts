export type FileOperation = "create" | "update" | "delete";

export type DeleteFileConfig = {
  targetPath: string;
  fileName: string;
  operation: "delete";
};

export type CreateFileConfig = {
  targetPath: string;
  sourcePath: string;
  fileName: string;
  rename?: string;
  operation: "create" | "update";
};

export type FilesConfig = DeleteFileConfig | CreateFileConfig;

export interface FrameworkAdapter {
  name: string;
  displayName: string;
  detectionPackages: { dependencies?: string[]; devDependencies?: string[] };
  files: FilesConfig[];
  requiredDependencies: string[];
  requiredDevDependencies: string[];
  envGitignorePattern: string;
  postScaffoldInstructions: string[];
}
