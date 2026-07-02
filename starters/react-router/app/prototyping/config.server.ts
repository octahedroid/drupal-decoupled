export interface PrototypingConfig {
  prototypingEnabled: boolean;
  anthropicApiKey?: string;
  canGenerate: boolean;
}

export function getPrototypingConfig(
  env: NodeJS.ProcessEnv = process.env,
): PrototypingConfig {
  const prototypingEnabled = env.PROTOTYPING_ENABLED === "true";
  const anthropicApiKey = env.ANTHROPIC_API_KEY?.trim() || undefined;

  return {
    prototypingEnabled,
    anthropicApiKey,
    canGenerate: prototypingEnabled && Boolean(anthropicApiKey),
  };
}

export function isPrototypingEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return getPrototypingConfig(env).prototypingEnabled;
}

export function assertPrototypingGenerationEnabled(
  env: NodeJS.ProcessEnv = process.env,
): { anthropicApiKey: string } {
  const config = getPrototypingConfig(env);

  if (!config.prototypingEnabled) {
    throw new Response("Prototyping is disabled", { status: 403 });
  }

  if (!config.anthropicApiKey) {
    throw new Response("Anthropic API key is not configured", { status: 403 });
  }

  return {
    anthropicApiKey: config.anthropicApiKey,
  };
}
