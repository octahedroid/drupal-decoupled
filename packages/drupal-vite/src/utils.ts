async function importWrangler() {
  try {
    // @ts-expect-error wrangler is an optional peer dependency
    const module = await import("wrangler");
    return module;
  } catch (_e) {
    return false;
  }
}

export const resolveValue = async (
  configValue: string | undefined,
  defaultEnvKey: string,
): Promise<string | undefined> => {
  let envAccess: NodeJS.ProcessEnv | Record<string, unknown> = process.env;
  const wrangler = await importWrangler();
  if (wrangler) {
    const { getPlatformProxy } = wrangler;
    const platformProxy = await getPlatformProxy();
    envAccess = platformProxy.env;
  }

  if (configValue && envAccess[configValue]) {
    return envAccess[configValue] as string;
  }

  if (configValue) {
    return configValue;
  }

  return envAccess[defaultEnvKey] as string | undefined;
};
