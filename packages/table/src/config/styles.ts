import { TableStyles } from '../@types';

export const defaultStyles: TableStyles = {
  tableStyles:
    'mt-4 flex flex-col rounded-xl border bg-zinc-100 p-2 shadow-2xl dark:bg-zinc-900 dark:border-zinc-600',
  tableHeaderClasses:
    'break-keep border-b border-gray-300 bg-zinc-100 px-6 py-3 text-center text-xs font-medium uppercase leading-4 tracking-wider text-gray-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white first:rounded-tl-lg last:rounded-tr-lg',
  searchHeaderClasses:
    'break-keep border-b border-gray-300 bg-zinc-100 px-6 py-3 text-center text-xs font-medium uppercase leading-4 tracking-wider text-gray-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white ',
  searchInputClasses:
    'rounded-lg border border-zinc-500 bg-zinc-50 p-1.5 pl-3 text-sm text-gray-900  dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 sm:w-full min-w-[200px]',
  tableRowClasses:
    'whitespace-nowrap border-b border-gray-300 bg-zinc-100 text-center  text-black dark:border-zinc-600 dark:bg-zinc-900 dark:text-slate-300 last:border-b-0',
  tableRowIsOddClasses: 'bg-grey-100 bg-opacity-40',
  tableCellStyles:
    'px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white',
  noDataStyles: 'text-center text-gray-500 dark:text-gray-400 py-4',
  checkboxStyles: 'h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600',
  tableFooterStyles: '',
};

export const createCustomStyles = (config: Partial<TableStyles>) => {
  return {
    ...defaultStyles,
    ...config,
  };
};
