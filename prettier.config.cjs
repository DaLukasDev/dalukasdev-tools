/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  // pluginSearchDirs: false,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindConfig: './apps/docs/pages/globals.css',
  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^@pcare/(.*)$',
    '^~/utils/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};

module.exports = config;
