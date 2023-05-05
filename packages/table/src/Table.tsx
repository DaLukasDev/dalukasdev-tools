import type { TableProps } from './@types';
import { TableFooter, TableHeader, TableRows } from './components';

export const Table = <T extends { id: number }, K extends keyof T>({
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
}: TableProps<T, K>) => (
  <div className="mt-4 flex flex-col">
    <div className="-my-2 overflow-x-auto py-2">
      <div className="inline-block min-w-full overflow-hidden rounded-lg align-middle sm:rounded-lg">
        <table className="min-w-full table-auto">
          <TableHeader
            onSearchChange={onSearchChange}
            searchTerm={searchTerm}
            columns={columns}
            checkbox={checkbox}
            disableSearch={disableSearch}
          />
          <TableRows
            data={data}
            columns={columns}
            checkbox={checkbox}
            multiSelect={multiSelect}
            onMultiSelectChange={onMultiSelectChange}
            isLoading={isLoading}
          />
        </table>
      </div>
    </div>
    <TableFooter
      paginatorProps={paginatorProps ?? ({} as any)}
      currentPageSize={currentPageSize}
      currentPage={currentPage}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      onPageSizeChange={onPageSizeChange}
    />
  </div>
);
