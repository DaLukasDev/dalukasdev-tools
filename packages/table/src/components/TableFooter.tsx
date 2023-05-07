import { Select } from '@dalukasdev/ui';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { TableFooterProps, TableStyles, localeConfig } from '../@types';

interface IndexesProps {
  lowerIndex: number;
  upperIndex: number;
  total: number;
  styles: TableStyles;
  locale: localeConfig;
}
const Indexes: FC<IndexesProps> = ({
  lowerIndex,
  total,
  upperIndex,
  locale,
  styles: { tableFooterTextStyles },
}) => (
  <span className="mt-2 text-sm text-gray-700 dark:text-gray-400">
    <span className={tableFooterTextStyles}>{lowerIndex}</span>-
    <span className={tableFooterTextStyles}>{upperIndex}</span>
    {locale.of}
    <span className={tableFooterTextStyles}>{total}</span>
  </span>
);

interface ButtonsProps {
  lastPage?: number;
  onNextPage: (page: number) => void;
  onPreviousPage: () => void;
  styles: TableStyles;
  locale: localeConfig;
}
const Buttons: FC<ButtonsProps> = ({
  onNextPage,
  onPreviousPage,
  lastPage,
  styles,
}) => (
  <div className="mt-2 space-x-0">
    <button onClick={onPreviousPage} className={styles.tableFooterButtonStyles}>
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
        />
      </svg>
    </button>
    <button
      onClick={() => onNextPage(lastPage ?? 100)}
      className={styles.tableFooterButtonStyles}
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
        />
      </svg>
    </button>
  </div>
);

interface RowsPerPageProps {
  currentPageSize: number;
  total: number;
  onPageSizeChange: (size: number) => void;
  styles: TableStyles;
  locale: localeConfig;
}
const RowsPerPage: FC<RowsPerPageProps> = ({
  currentPageSize,
  onPageSizeChange,
  total,
  locale,
  styles: { tableFooterRowsPerPageStyles },
}) => (
  <div className="mt-2 inline-flex items-center space-x-2">
    <span className={tableFooterRowsPerPageStyles}>{locale.rowCount}</span>
    <Select
      value={currentPageSize}
      options={[
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '30', value: 30 },
        { label: '40', value: 40 },
        { label: '50', value: 50 },
        { label: locale.all, value: total },
      ]}
      onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
    />
  </div>
);

export const TableFooter: FC<TableFooterProps> = ({
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  currentPageSize,
  currentPage,
  paginatorProps: { lastPage, total },
  locale,
  styles,
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

  return (
    <div className={styles.tableFooterStyles}>
      <RowsPerPage
        currentPageSize={currentPageSize}
        total={total}
        onPageSizeChange={onPageSizeChange}
        locale={locale}
        styles={styles}
      />
      <Indexes
        lowerIndex={lowerIndex}
        upperIndex={upperIndex}
        total={total}
        locale={locale}
        styles={styles}
      />
      <Buttons
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        lastPage={lastPage}
        locale={locale}
        styles={styles}
      />
    </div>
  );
};
