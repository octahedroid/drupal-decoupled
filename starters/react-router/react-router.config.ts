import type { Config } from '@react-router/dev/config'

export default {
  ssr: true,
  future: {
    unstable_viteEnvironmentApi: true,
    unstable_optimizeDeps: true,
  },
} satisfies Config
