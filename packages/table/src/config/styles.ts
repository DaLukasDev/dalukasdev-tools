import { TableStyles } from '../@types';

export const defaultStyles: TableStyles = {
  tableStyles:
    'mt-4 flex flex-col rounded-xl border bg-zinc-100 p-2 shadow-2xl dark:bg-zinc-900 dark:border-zinc-600',
  tableHeaderClasses:
    'break-keep border-b border-gray-300 bg-zinc-100 px-6 py-3 text-center text-xs font-medium uppercase leading-4 tracking-wider text-gray-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white first:rounded-tl-lg last:rounded-tr-lg',
  searchHeaderClasses:
    'break-keep border-b border-gray-300 bg-zinc-100 px-6 py-3 text-center text-xs font-medium uppercase leading-4 tracking-wider text-gray-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white ',
  searchInputClasses:
    'rounded-lg border border-zinc-500 bg-zinc-50 p-1.5 pl-3 text-sm text-gray-900  dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 sm:w-full min-w-[150px]',
  tableRowClasses:
    'whitespace-nowrap border-b border-gray-300 bg-zinc-100 text-black dark:border-zinc-600 dark:bg-zinc-900 dark:text-slate-300 last:border-b-0 odd:bg-gray-100 dark:odd:bg-zinc-700 odd:bg-opacity-40 ',
  tableCellStyles:
    'px-6 py-6 whitespace-nowrap text-sm text-gray-900 dark:text-white first:text-left  text-center',
  noDataStyles: 'text-center text-gray-500 dark:text-gray-400 py-4',
  checkboxStyles: 'h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600',
  tableFooterStyles:
    'mt-2 flex flex-col items-center space-x-2 rounded-lg border dark:border-zinc-600 pb-2 pr-2 sm:flex-row sm:justify-end',
  tableFooterButtonStyles:
    'inline-flex items-center first:rounded-l-md last:rounded-r-md bg-zinc-700 px-4 py-2 text-sm font-medium  text-white hover:bg-zinc-500 hover:text-gray-200 focus:z-10  focus:ring-2 disabled:bg-gray-700 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-700 dark:hover:text-white  dark:focus:text-white disabled:dark:bg-gray-700',
  tableFooterTextStyles: 'px-1 font-semibold text-gray-900 dark:text-white',
  tableFooterRowsPerPageStyles:
    'whitespace-nowrap text-sm text-gray-700 dark:text-white',
};

export const createCustomStyles = (config: Partial<TableStyles>) => {
  return {
    ...defaultStyles,
    ...config,
  };
};
