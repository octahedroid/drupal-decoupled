export const SUPPORTED_FRONTENDS = ['remix'] as const

export type SupportedFrontend = (typeof SUPPORTED_FRONTENDS)[number]

export const FRONTEND_READABLE_NAME_TO_MACHINE_NAME: Record<
  string,
  SupportedFrontend
> = {
  Remix: 'remix',
} as const

export function getFrontendMachineName(
  frontendReadableName: string
): SupportedFrontend {
  return FRONTEND_READABLE_NAME_TO_MACHINE_NAME[frontendReadableName]
}
