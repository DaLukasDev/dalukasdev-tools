import fs from 'node:fs';
import chalk, { type ForegroundColorName } from 'chalk';
import { parse as csvParse } from 'fast-csv';
import { glob } from 'glob';
import minimist from 'minimist';

export const parseArgs = () => minimist(process.argv.slice(2));

export const prepareKeyForSearch = (key: string): string => {
  const strippedKey = key.replace(/^["'`]|["'`]$/g, '');
  return strippedKey.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');
};

type TranslationRow = { Key: string; [a: string]: string };

export const readTranslations = async (
  filePath: string
): Promise<{
  translations: TranslationRow[];
  translationKeys: string[];
  headers: string[];
}> =>
  new Promise((resolve, reject) => {
    const translations: TranslationRow[] = [];
    const translationKeys: string[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParse({ headers: true }))
      .on('data', (row: TranslationRow) => {
        translations.push(row);
        translationKeys.push(row.Key);
      })
      .on('end', () => {
        resolve({
          translations,
          translationKeys,
          headers: Object.keys(translations[0] ?? {}),
        });
      })
      .on('error', reject);
  });

export const checkAlphabeticalOrder = (rows: TranslationRow[]) => {
  const unsortedPairs = [];

  for (let i = 1; i < rows.length; i++) {
    const prevKey = prepareKeyForSearch(
      rows.at(i - 1)?.Key ?? ''
    ).toLowerCase();
    const currentKey = prepareKeyForSearch(rows.at(i)?.Key ?? '').toLowerCase();

    if (prevKey.localeCompare(currentKey) > 0) {
      unsortedPairs.push(
        `${String(rows.at(i - 1)?.Key)} -> ${String(rows[i]?.Key)}`
      );
    }
  }

  return {
    isSorted: unsortedPairs.length === 0,
    unsortedPairs,
  };
};

export const sortTranslationsAlphabetically = (rows: TranslationRow[]) => {
  return [...rows].sort((a, b) => {
    const keyA = prepareKeyForSearch(a.Key).toLowerCase();
    const keyB = prepareKeyForSearch(b.Key).toLowerCase();
    return keyA.localeCompare(keyB);
  });
};

export const logger = (
  message: string | number,
  color: ForegroundColorName
) => {
  console.log(chalk[color](message));
};

export const getAllCodeFiles = async () => {
  const args = parseArgs();
  const fileTypes = (args.ext as string | undefined) ?? 'js,vue';
  const pattern = `**/*.{${fileTypes}}`;
  const IGNORED_DIRS = ['node_modules/**', 'dist/**'];
  return glob(pattern, { ignore: IGNORED_DIRS });
};

export const findKeyInContent = (key: string, content: string) => {
  const processedKey = prepareKeyForSearch(key);
  const tFunctionRegex = new RegExp(`t\\(['"\`]${processedKey}['"\`]\\)`);
  const wholeWordRegex = new RegExp(`\\b${processedKey}\\b`);
  return tFunctionRegex.test(content) || wholeWordRegex.test(content);
};

export const searchForKey = (key: string, files: string[]) => {
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (findKeyInContent(key, content)) {
        return true;
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }
  return false;
};

export const findUnusedTranslations = (
  translations: string[],
  codeFiles: string[]
) => {
  const unusedTranslations: string[] = [];

  for (const key of translations) {
    if (!searchForKey(key, codeFiles)) {
      unusedTranslations.push(key);
    }
  }
  return unusedTranslations;
};

const extractTranslationKeys = (content: string) => {
  const tFunctionRegex =
    /(?:^|\s|\()(?:\$?t)\(\s*['"`]((?:(?!['"`]\s*[,)}]).)*?)['"`]\s*\)/g;
  const keys = new Set<string>();

  let match;
  while ((match = tFunctionRegex.exec(content)) !== null) {
    if (match[1]) {
      const key = match[1].trim();
      if (
        key &&
        !key.includes('${') &&
        !key.includes(' ') &&
        !key.includes("'") &&
        !key.includes('"') &&
        !key.includes('key') &&
        !key.includes('`')
      ) {
        keys.add(key);
      }
    }
  }

  return Array.from(keys);
};

export const findMissingTranslations = (
  translationKeys: string[],
  codeFiles: string[]
) => {
  const foundKeys = new Set<string>();

  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const keys = extractTranslationKeys(content);
      keys.forEach((key) => foundKeys.add(key));
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return Array.from(foundKeys).filter((key) => !translationKeys.includes(key));
};
