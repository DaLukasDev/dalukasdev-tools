import { localeConfig } from '../@types';

export const defaultLocale: localeConfig = {
  searchPlaceholder: 'Search...',
  noData: 'No data',
  noResults: 'No results',
  loading: 'Loading...',
  noValue: 'No value',
  all: 'All',
  rowCount: 'Rows per page',
  of: 'of',
};

export const createCustomLocale = (config: Partial<localeConfig>) => {
  return {
    ...defaultLocale,
    ...config,
  };
};
