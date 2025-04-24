export const SUPPORTED_FRONTENDS = ['remix', 'next', 'react-router'] as const

export type SupportedFrontend = (typeof SUPPORTED_FRONTENDS)[number]

export const FRONTEND_MACHINE_NAME_TO_READABLE_NAME: Record<
  SupportedFrontend,
  string
> = {
  remix: 'Remix',
  next: 'Next',
  'react-router': 'React-Router',
} as const

export function getFrontendReadableName(frontendName: SupportedFrontend) {
  return FRONTEND_MACHINE_NAME_TO_READABLE_NAME[frontendName]
}

export function isSupportedFrontend(
  frontend: string
): frontend is SupportedFrontend {
  return SUPPORTED_FRONTENDS.includes(frontend as SupportedFrontend)
}
