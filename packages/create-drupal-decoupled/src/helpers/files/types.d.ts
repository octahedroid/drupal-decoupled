type SourcePath = `${SupportedFrontend}-graphql` | "shared";

type DeleteFileConfig = {
  targetPath: string;
  fileName: string;
  operation: "delete";
};

type CreateFileConfig = {
  targetPath: string;
  sourcePath: SourcePath;
  fileName: string;
  rename?: string;
  sanitize?: (content: string) => string;
  operation: "create" | "update";
};

type FilesConfig = DeleteFileConfig | CreateFileConfig;

type ScaffoldFilesPerFrontend = Record<
  SupportedFrontend,
  {
    files: FilesConfig[];
  }
>;
