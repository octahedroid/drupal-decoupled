export const SUPPORTED_FRONTENDS = ['remix', 'next'] as const

export type SupportedFrontend = (typeof SUPPORTED_FRONTENDS)[number]

export const FRONTEND_MACHINE_NAME_TO_READABLE_NAME: Record<
  SupportedFrontend,
  Capitalize<SupportedFrontend>
> = {
  remix: 'Remix',
  next: 'Next',
} as const

export function getFrontendReadableName(
  frontendName: SupportedFrontend
) {
  return FRONTEND_MACHINE_NAME_TO_READABLE_NAME[frontendName]
}

export function isSupportedFrontend(frontend: string): frontend is SupportedFrontend {
  return SUPPORTED_FRONTENDS.includes(frontend as SupportedFrontend)
}