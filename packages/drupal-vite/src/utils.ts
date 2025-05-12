export const resolveValue = (
  configValue: string | undefined,
  defaultEnvKey: string
): string | undefined => {
  if (configValue && process.env[configValue]) {
    return process.env[configValue];
  }

  if (configValue) {
    return configValue;
  }

  return process.env[defaultEnvKey];
};
