import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'lib/guild-mini-vue.cjs.js',
    },
    {
      format: 'es',
      file: 'lib/guild-mini-vue.esm.js',
    },
  ],
  plugins: [typescript()],
};
