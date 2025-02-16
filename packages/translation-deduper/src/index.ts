import {
  checkAlphabeticalOrder,
  findMissingTranslations,
  findUnusedTranslations,
  getAllCodeFiles,
  logger,
  parseArgs,
  readTranslations,
} from './utils';

const main = async () => {
  console.clear();
  const args = parseArgs();
  console.log(args);

  if (!args._[0]) {
    console.error('No file provided');
    process.exit(1);
  }

  const shouldDelete = Boolean(args.d);
  const shouldSort = Boolean(args.s);
  const shouldAdd = Boolean(args.a);

  const { translationKeys, translations, headers } = await readTranslations(
    args._[0]
  );

  const files = await getAllCodeFiles();
  logger(files.join('\n'), 'yellow');
  const unusedTranslations = findUnusedTranslations(translationKeys, files);
  logger(unusedTranslations.length, 'red');
  logger(unusedTranslations.join('\n'), 'red');

  const newTranslations = [];

  if (!shouldDelete) {
    newTranslations.push(...translations);
  }

  if (shouldDelete) {
    logger('Deleting unused translations...', 'cyan');
    newTranslations.push(
      ...translations.filter((t) => !unusedTranslations.includes(t.Key))
    );

    logger('Deleted unused translations', 'green');
  }
  if (shouldAdd) {
    logger('Adding missing translations...', 'cyan');
    const missingTranslations = findMissingTranslations(translationKeys, files);
    console.log(missingTranslations);
    newTranslations.push(
      ...missingTranslations.map((key) => ({
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
      }))
    );
    logger('Added missing translations', 'green');
  }

  if (!shouldSort) {
    const { unsortedPairs } = checkAlphabeticalOrder(translations);
    logger(unsortedPairs.join('\n'), 'yellow');
  }
  if (shouldSort) {
    logger('Sorting translations alphabetically...', 'cyan');
    newTranslations.sort((a, b) => a.Key.localeCompare(b.Key));
    logger('Sorted translations', 'green');
  }
  console.log(newTranslations);
};

main().catch((e: unknown) => {
  console.error(e);
});
