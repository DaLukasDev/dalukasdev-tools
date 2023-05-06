import type { RefObject } from 'react';

export type PaginatorInfo = {
  count: number;
  currentPage: number;
  firstItem?: number;
  hasMorePages: boolean;
  lastItem?: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export interface ColumnDefinitionType<T> {
  key: keyof T | 'actions';
  subKey?: string;
  prefix?: string;
  header: string;
  searchable?: boolean;
  searchKey?: keyof T | string;
  actions?: TableActionsProps<T>[];
  isDate?: boolean;
  dateFormat?: string;
  className?: string;
}

export interface TableProps<T, K extends keyof T> {
  data: Array<T> | undefined;
  columns: ColumnDefinitionType<T>[];
  paginatorProps?: PaginatorInfo;
  currentPageSize?: number;
  currentPage?: number;
  checkbox?: boolean;
  multiSelect?: string[];
  searchTerm?: Partial<{ [x in K]: string }>;
  onSearchChange: (searchTerm: string, column: K | string) => void;
  onNextPage: (maxPage: number) => void;
  onPreviousPage: () => void;
  onPageSizeChange: (pageSize: number) => void;
  onMultiSelectChange?: (selectedItem: string, added: boolean) => void;
  disableSearch?: boolean;
  isLoading?: boolean;
  styles?: TableStyles;
  locale?: localeConfig;
}

export interface TableHeaderProps<T, K extends keyof T> {
  columns: Array<ColumnDefinitionType<T>>;
  searchTerm?: Partial<{ [x in K]: string }>;
  onSearchChange: (searchTerm: string, column: K | string) => void;
  checkbox?: boolean;
  disableSearch?: boolean;
  styles: TableStyles;
  locale: localeConfig;
}

export interface TableRowsProps<T> {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
  checkbox?: boolean;
  multiSelect?: string[];
  onMultiSelectChange?: (selectedItem: string, added: boolean) => void;
  isLoading?: boolean;
  styles: TableStyles;
  locale: localeConfig;
}

export interface TableFooterProps {
  currentPageSize: number;
  currentPage: number;
  onNextPage: (maxPage: number) => void;
  onPreviousPage: () => void;
  onPageSizeChange: (pageSize: number) => void;
  paginatorProps: PaginatorInfo;
  styles: TableStyles;
  locale: localeConfig;
}

export interface TableActionsProps<T> {
  icon: JSX.Element;
  styles: string;
  onClick: (rowData: T) => void;
}

export type SearchType<T> = Partial<{ [x in keyof T | string]: string }>;
export type ColumnType<T> = Array<ColumnDefinitionType<T>>;

export interface TableReturn<T> {
  page: number;
  pageSize: number;
  multiSelect: string[];
  tableCard: RefObject<HTMLDivElement>;
  searchTerm: SearchType<T>;
  onSearchChangedHandler: (key: keyof T | string, value: string) => void;
  nextPageHandler: (maxPage: number) => void;
  prevPageHandler: () => void;
  pageSizeChangeHandler: (size: number) => void;
  onMultiSelectChange?: (value: string, checked: boolean) => void;
  resetTable: () => void;
}

export type localeConfig = {
  searchPlaceholder: string;
  noData: string;
  noResults: string;
  loading: string;
  noValue: string;
  all: string;
  rowCount: string;
  of: string;
};
export type TableStyles = {
  tableHeaderClasses: string;
  searchHeaderClasses: string;
  searchInputClasses: string;
  tableRowClasses: string;
  tableRowIsOddClasses: string;
  tableCellStyles: string;
  noDataStyles: string;
  checkboxStyles: string;
  tableFooterStyles: string;
  tableStyles: string;
};
