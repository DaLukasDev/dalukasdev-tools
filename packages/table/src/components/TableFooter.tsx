import { Select } from '@dalukasdev/ui';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import type { TableFooterProps } from '../@types';

export const TableFooter: FC<TableFooterProps> = ({
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  currentPageSize,
  currentPage,
  paginatorProps: { lastPage, total },
}) => {
  const lowerIndex = useMemo(
    () => (currentPage - 1) * currentPageSize + 1,
    [currentPage, currentPageSize]
  );
  const upperIndex = useMemo(
    () =>
      total > currentPage * currentPageSize
        ? currentPage * currentPageSize
        : total,
    [currentPage, currentPageSize, total]
  );

  const RowsPerPage = memo(() => (
    <div className="mt-2 inline-flex items-center space-x-2">
      <span className="whitespace-nowrap text-sm text-gray-700">
        {'row count'}
      </span>
      <Select
        value={currentPageSize}
        options={[
          { label: '5', value: 5 },
          { label: '10', value: 10 },
          { label: '20', value: 20 },
          { label: '30', value: 30 },
          { label: '40', value: 40 },
          { label: '50', value: 50 },
          { label: 'all', value: total },
        ]}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
      />
    </div>
  ));
  RowsPerPage.displayName = 'RowsPerPage';

  const Indexes = memo(() => (
    <span className="mt-2 text-sm text-gray-700 dark:text-gray-400">
      <span className="px-1 font-semibold text-gray-900">{lowerIndex}</span>-
      <span className="px-1 font-semibold text-gray-900">{upperIndex}</span>
      {'of'}
      <span className="px-1 font-semibold text-gray-900">{total}</span>
    </span>
  ));
  Indexes.displayName = 'Indexes';

  const Buttons = memo(() => (
    <div className="mt-2 space-x-0">
      <button onClick={onPreviousPage} className="btn btn-primary rounded-l-md">
        <svg
          aria-hidden="true"
          className="mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => onNextPage(lastPage ?? 100)}
        className="btn btn-primary rounded-r-md"
      >
        <svg
          aria-hidden="true"
          className="ml-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  ));
  Buttons.displayName = 'Buttons';
  return (
    <div className="mt-2 flex flex-col items-center space-x-2 rounded-lg border pb-2 pr-2 sm:flex-row sm:justify-end">
      <RowsPerPage />
      <Indexes />
      <Buttons />
    </div>
  );
};
