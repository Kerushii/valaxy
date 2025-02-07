import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: [
      'src/node/index.ts',
      'src/node/cli.ts',
    ],
    // https://tsup.egoist.sh/#code-splitting
    // Code splitting currently only works with the esm output format, and it's enabled by default. If you want code splitting for cjs output format as well, try using --splitting flag which is an experimental feature to get rid of the limitation in esbuild.
    splitting: true,
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    minify: !options.watch,
    external: [
      '@valaxyjs/config',
      'valaxy-theme-yun',
    ],
  }
})
