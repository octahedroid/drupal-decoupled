export const DrupalClientFile = {
  targetPath: 'app/utils',
  sourcePath: 'shared',
  fileName: 'client.server.ts',
  operation: 'create',
} satisfies FilesConfig

export const DrupalAuthFile = {
  targetPath: 'app/utils',
  sourcePath: 'shared',
  fileName: 'auth.server.ts',
  operation: 'create',
} satisfies FilesConfig

export const TailwindCSSFile = {
  targetPath: 'app',
  sourcePath: 'shared',
  fileName: 'tailwind.css',
  operation: 'update',
} satisfies FilesConfig

export const EnvFile = {
  targetPath: '.',
  sourcePath: 'shared',
  fileName: '.env.example',
  operation: 'create',
} satisfies FilesConfig
