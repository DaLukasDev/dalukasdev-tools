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
  tailwindConfig: './packages/config/tailwind',
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
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};

module.exports = config;
