import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  plugins: [
    react(),
    federation({
      name: 'examples_rust',
      remotes: {
        viteRemote: 'viteRemote@http://localhost:5176/mf-manifest.json',
        shared: 'shared@https://shared.js',
      },
      // implementation: require.resolve('@module-federation/runtime'),
      runtimePlugins: ['./src/shared/plugin'],
    })
  ],
  build: {
    target: "chrome89"
  }
})
