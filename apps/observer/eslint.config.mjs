import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: [
      '.next/**/*',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '**/out-tsc',
    ],
  },
]);

export default eslintConfig;
