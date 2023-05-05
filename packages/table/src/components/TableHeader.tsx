import { useMemo } from 'react';
import { SearchType, TableHeaderProps } from '../@types';

export const TableHeader = <T, K extends keyof T>({
  columns,
  onSearchChange,
  searchTerm,
  checkbox,
  disableSearch = false,
}: TableHeaderProps<T, K>): JSX.Element => {
  const newSearchTerm = useMemo(() => {
    if (!searchTerm) return;
    return Object.keys(searchTerm).reduce((curr, next) => {
      if (next.split(/(?=[A-Z])/).length >= 2) {
        const searchTermCollector = next.split(/(?=[A-Z])/);
        const newKey =
          searchTermCollector.length === 3
            ? `${searchTermCollector[0].toLowerCase()}${
                searchTermCollector[1].toLowerCase().charAt(0).toUpperCase() +
                searchTermCollector[1].slice(1)
              }.${searchTermCollector[2].toLowerCase()}`
            : ['name', 'Name'].includes(searchTermCollector[1])
            ? `${searchTermCollector[0].toLowerCase()}.${searchTermCollector[1].toLowerCase()}`
            : `${searchTermCollector[0]}${
                searchTermCollector[1].toLowerCase().charAt(0).toUpperCase() +
                searchTermCollector[1].slice(1)
              }`;
        return { ...curr, [newKey]: searchTerm[next as K] };
      }
      return { ...curr, [next]: searchTerm[next as K] };
    }, {} as SearchType<T>);
  }, [searchTerm]);

  const headers = columns.map((column, index) => (
    <th className="table-header" key={`headCell-${index}`}>
      {column.header}
    </th>
  ));

  const filterRow = columns.map((column, index) => (
    <th className="table-header" key={`filterCell-${index}`}>
      {column.filterable && (
        <input
          value={
            (newSearchTerm &&
              newSearchTerm[
                column.subKey
                  ? `${column.key.toString()}.${column.subKey}`
                  : (column.key as K)
              ]) ??
            ''
          }
          className="table-input-field"
          onChange={(e) =>
            column.subKey?.length
              ? onSearchChange(
                  e.target.value,
                  `${column.key.toString()}.${column.subKey?.toString()}`
                )
              : onSearchChange(e.target.value, column.key.toString())
          }
        />
      )}
    </th>
  ));

  return (
    <thead>
      <tr>
        {checkbox && <th className="table-header">Multi</th>}
        {headers}
      </tr>
      {!disableSearch && (
        <tr>
          {checkbox && <th className="table-header"></th>}
          {filterRow}
        </tr>
      )}
    </thead>
  );
};
