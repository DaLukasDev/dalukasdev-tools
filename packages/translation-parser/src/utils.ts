import fs from 'node:fs';
import chalk, { type ForegroundColorName } from 'chalk';
import cliProgress from 'cli-progress';
import { parse as csvParse, write as csvStringify } from 'fast-csv';
import { glob } from 'glob';
import minimist from 'minimist';

export const multibar = new cliProgress.MultiBar(
  {
    clearOnComplete: false,
    hideCursor: true,
    format: '{bar} {percentage}% | {value}/{total} {label}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  },
  cliProgress.Presets.shades_classic
);

export const parseArgs = () => minimist(process.argv.slice(2));

export const sanitizeKey = (key: string): string => {
  const strippedKey = key.replace(/^["'`]|["'`]$/g, '');
  return strippedKey.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');
};

export type TranslationRow = { Key: string; [a: string]: string };

export const readTranslations = async (
  filePath: string
): Promise<{
  translations: TranslationRow[];
  translationKeys: string[];
  headers: string[];
}> => {
  const totalLines = await new Promise<number>((resolve) => {
    let lineCount = 0;
    fs.createReadStream(filePath)
      .on('data', (buffer) => {
        lineCount += buffer.toString().split('\n').length - 1;
      })
      .on('end', () => {
        resolve(lineCount);
      });
  });

  const loadingBar = multibar.create(totalLines - 1, 0, {
    label: 'Loading translations...',
  });

  return new Promise((resolve, reject) => {
    const translations: TranslationRow[] = [];
    const translationKeys: string[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParse({ headers: true }))
      .on('data', (row: TranslationRow) => {
        translations.push(row);
        translationKeys.push(row.Key);
        loadingBar.update(translationKeys.length - 1);
      })
      .on('end', () => {
        loadingBar.stop();
        resolve({
          translations,
          translationKeys,
          headers: Object.keys(translations[0] ?? {}),
        });
      })
      .on('error', reject);
  });
};

export const checkAlphabeticalOrder = (rows: TranslationRow[]) => {
  const unsortedPairs = [];

  for (let i = 1; i < rows.length; i++) {
    const prevKey = sanitizeKey(rows.at(i - 1)?.Key ?? '').toLowerCase();
    const currentKey = sanitizeKey(rows.at(i)?.Key ?? '').toLowerCase();

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
    const keyA = sanitizeKey(a.Key).toLowerCase();
    const keyB = sanitizeKey(b.Key).toLowerCase();
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
  const processedKey = sanitizeKey(key);
  const tFunctionRegex = new RegExp(`t\\(['"\`]${processedKey}['"\`]\\)`);
  const wholeWordRegex = new RegExp(`\\b${processedKey}\\b`);
  return tFunctionRegex.test(content) || wholeWordRegex.test(content);
};

export const searchForKey = (
  key: string,
  files: string[],
  progressBar: cliProgress.SingleBar
) => {
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (findKeyInContent(key, content)) {
        return true;
      }
      progressBar.update({ label: `Searching file ${file}` });
      progressBar.increment(1);
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
  const totalSearches = translations.length - 1;

  const searchBar = multibar.create(totalSearches, 0, {
    label: 'Searching for unused translations...',
  });

  const fileBar = multibar.create(codeFiles.length, 0, {
    label: 'Scanning files...',
    clearOnComplete: true,
  });

  for (const key of translations) {
    if (!searchForKey(key, codeFiles, fileBar)) {
      unusedTranslations.push(key);
    }

    searchBar.increment(1);
    fileBar.update(0);
    searchBar.update({ label: `Searching for ${key}` });
  }
  searchBar.stop();
  fileBar.stop();

  return unusedTranslations;
};

const extractTranslationKeys = (content: string) => {
  const tFunctionRegex =
    /(?:^|[^a-zA-Z0-9])(?:\$?t)\(\s*['"`]((?:(?!['"`]).)*?)['"`](?:\s*,\s*\{[^}]*\})?\s*\)/g;
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
  const scanBar = multibar.create(codeFiles.length, 0, {
    label: 'Scanning files for translations...',
  });

  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const keys = extractTranslationKeys(content);
      keys.forEach((key) => foundKeys.add(sanitizeKey(key)));
      scanBar.increment(1);
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }
  scanBar.stop();

  const sanitizedTranslationKeys = translationKeys.map(sanitizeKey);
  return Array.from(foundKeys).filter(
    (key) => !sanitizedTranslationKeys.includes(key)
  );
};

export const createObjectFromMissingTranslations = (
  missingTranslations: string[],
  headers: string[]
): { Key: string; [a: string]: string }[] =>
  missingTranslations.map((key) => ({
    Key: key,
    ...headers.reduce<Record<string, string>>(
      (prev, curr) =>
        curr === 'Key'
          ? prev
          : {
              ...prev,
              [curr]: '',
            },
      {}
    ),
  }));

export const writeTranslationsToFile = async (
  translations: TranslationRow[],
  filePath: string
) => {
  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    csvStringify(translations, { headers: true })
      .pipe(writeStream)
      .on('finish', () => {
        resolve(true);
      })
      .on('error', reject);
  });
};

export const findDuplicateTranslationsIndices = (
  translations: TranslationRow[]
) => {
  const seen = new Set<string>();
  const duplicateTranslationsIndices: number[] = [];

  translations.forEach((translation, index) => {
    const currentKey = sanitizeKey(translation.Key);
    if (seen.has(currentKey)) {
      duplicateTranslationsIndices.push(index);
    }
    seen.add(currentKey);
  });
  return duplicateTranslationsIndices;
};

export const exitErrorIfCi = () => {
  if (process.env.CI) {
    process.exit(1);
  }
};
