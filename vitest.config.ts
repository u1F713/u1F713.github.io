import fs from 'node:fs'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const envFile = '.env.local'
if (fs.existsSync(envFile)) process.loadEnvFile(envFile)

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: { environment: 'node' }
})
