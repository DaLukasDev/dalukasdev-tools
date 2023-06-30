import type { NestedKeys, PaginatorInfo, TableProps } from './@types';
import { TableFooter, TableHeader, TableRows } from './components';
import { defaultLocale } from './config';
import { defaultStyles } from './config/styles';

export const Table = <
  T extends { id: string } & NestedKeys<T>,
  K extends keyof T
>({
  data = [],
  columns,
  onNextPage,
  onPreviousPage,
  onPageSizeChange,
  currentPageSize = 0,
  currentPage = 0,
  onSearchChange,
  searchTerm,
  checkbox,
  onMultiSelectChange,
  multiSelect,
  paginatorProps,
  disableSearch,
  isLoading,
  locale: CLocale,
  styles: CStyles,
  disablePagination = false,
  globalSearchTerm,
  onGlobalSearchChange,
}: TableProps<T, K>) => {
  const styles = CStyles ?? defaultStyles;
  const locale = CLocale ?? defaultLocale;
  return (
    <div className={styles.tableStyles}>
      <div className="overflow-x-auto">
        <table className={styles.table}>
          <TableHeader
            globalSearchTerm={globalSearchTerm}
            onGlobalSearchChange={onGlobalSearchChange}
            onSearchChange={onSearchChange}
            searchTerm={searchTerm}
            columns={columns}
            checkbox={checkbox}
            disableSearch={disableSearch}
            locale={locale}
            styles={styles}
          />
          <TableRows
            data={data}
            columns={columns}
            checkbox={checkbox}
            multiSelect={multiSelect}
            onMultiSelectChange={onMultiSelectChange}
            isLoading={isLoading}
            locale={locale}
            styles={styles}
          />
        </table>
      </div>
      {!disablePagination && (
        <TableFooter
          paginatorProps={paginatorProps ?? ({} as PaginatorInfo)}
          currentPageSize={currentPageSize}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageSizeChange={onPageSizeChange}
          locale={locale}
          styles={styles}
        />
      )}
    </div>
  );
};
