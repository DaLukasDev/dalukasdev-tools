import {
  checkAlphabeticalOrder,
  createObjectFromMissingTranslations,
  findDuplicateTranslationsIndices,
  findMissingTranslations,
  findUnusedTranslations,
  getAllCodeFiles,
  logger,
  parseArgs,
  readTranslations,
  writeTranslationsToFile,
  type TranslationRow,
} from './utils';

const main = async () => {
  const args = parseArgs();

  if (!args._[0]) {
    logger('No file provided', 'red');
    process.exit(1);
  }

  const shouldDelete = Boolean(args.d);
  const shouldSort = Boolean(args.s);
  const shouldAdd = Boolean(args.a);
  const filePath = args._[0];
  const { translationKeys, translations, headers } =
    await readTranslations(filePath);

  const files = await getAllCodeFiles();

  const unusedTranslations = findUnusedTranslations(translationKeys, files);

  if (unusedTranslations.length > 0) {
    logger(unusedTranslations.length, 'red');
    logger(unusedTranslations.join('\n'), 'red');
  }

  const newTranslations: TranslationRow[] = [];

  if (!shouldDelete) {
    newTranslations.push(...translations);
  }

  if (shouldDelete) {
    if (unusedTranslations.length === 0) {
      newTranslations.push(...translations);
      logger('No unused translations found', 'green');
    }

    if (unusedTranslations.length > 0) {
      logger('Deleting unused translations...', 'cyan');
      newTranslations.push(
        ...translations.filter((t) => !unusedTranslations.includes(t.Key))
      );

      logger('Deleted unused translations', 'green');
    }
  }

  if (shouldAdd) {
    const missingTranslations = findMissingTranslations(translationKeys, files);
    if (missingTranslations.length === 0) {
      logger('No missing translations found', 'green');
    }
    if (missingTranslations.length > 0) {
      logger('Adding missing translations...', 'cyan');
      newTranslations.push(
        ...createObjectFromMissingTranslations(missingTranslations, headers)
      );
      logger('Added missing translations', 'green');
    }
  }

  const { unsortedPairs, isSorted } = checkAlphabeticalOrder(translations);

  if (!shouldSort) {
    logger('You have unsorted translations:', 'yellow');
    logger(unsortedPairs.join('\n'), 'yellow');
  }

  if (shouldSort && !isSorted) {
    logger('Sorting translations alphabetically...', 'cyan');
    newTranslations.sort((a, b) => a.Key.localeCompare(b.Key));
    logger('Sorted translations', 'green');
  }
  if (shouldSort && isSorted) {
    logger('Translations are already sorted', 'green');
  }

  const duplicateTranslationsIndices =
    findDuplicateTranslationsIndices(newTranslations);

  if (duplicateTranslationsIndices.length === 0) {
    logger('No duplicate translations found', 'green');
  }

  if (duplicateTranslationsIndices.length > 0) {
    logger('You have duplicate translations:', 'yellow');
    logger(duplicateTranslationsIndices.join('\n'), 'yellow');
    logger('Deleting the last one of each duplicate', 'red');

    duplicateTranslationsIndices.forEach((index, indexInLoop) => {
      newTranslations.splice(index - indexInLoop, 1);
    });
  }

  await writeTranslationsToFile(newTranslations, filePath);
};

main().catch((e: unknown) => {
  console.error(e);
});
