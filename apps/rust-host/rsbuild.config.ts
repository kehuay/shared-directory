import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  server: {
    port: 5172,
    open: true,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: 'http://localhost:5172',
  },
  plugins: [
    pluginReact({
      splitChunks: {
        react: false,
        router: false,
      },
    }),
    pluginModuleFederation({
      name: 'examples_rust',
      remotes: {
        viteRemote: 'viteRemote@http://localhost:5176/mf-manifest.json',
        shared: 'shared@https://shared.js',
      },
      // implementation: require.resolve('@module-federation/runtime'),
      runtimePlugins: ['./src/shared/plugin'],
    }),
  ],
});
