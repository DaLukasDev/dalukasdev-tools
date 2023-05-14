import type { TableHeaderProps } from '../@types';

export const TableHeader = <T, K extends keyof T>({
  columns,
  onSearchChange,
  searchTerm,
  checkbox,
  disableSearch = false,
  locale,
  styles,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => (
    <th className={styles.tableHeaderClasses} key={`headCell-${index}`}>
      {column.header}
    </th>
  ));

  const filterRow = columns.map((column, index) => (
    <th className={styles.searchHeaderClasses} key={`filterCell-${index}`}>
      {column.searchable && (
        <input
          value={
            (searchTerm &&
              searchTerm[column.searchKey ? column.searchKey : column.key]) ??
            ''
          }
          placeholder={locale.searchPlaceholder}
          className={styles.searchInputClasses}
          onChange={(e) =>
            onSearchChange
              ? column.searchKey
                ? onSearchChange(column.searchKey.toString(), e.target.value)
                : onSearchChange(column.key.toString(), e.target.value)
              : console.error('onSearchChange is not implemented')
          }
        />
      )}
    </th>
  ));

  return (
    <thead className={styles.thead}>
      <tr>
        {checkbox && <th className={styles.tableHeaderClasses}>Multi</th>}
        {headers}
      </tr>
      {!disableSearch && (
        <tr>
          {checkbox && <th className={styles.tableHeaderClasses}></th>}
          {filterRow}
        </tr>
      )}
    </thead>
  );
};
