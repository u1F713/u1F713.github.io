import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const { pathname: envFile } = new URL('.env.local', import.meta.url)
process.loadEnvFile(envFile)

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: { environment: 'node' }
})
