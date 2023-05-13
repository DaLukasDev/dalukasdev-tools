import { Loader } from '@dalukasdev/ui';
import type { NestedKeys, TableRowsProps } from '../@types';
import { TableCell } from './TableCell';

export const TableRows = <T extends { id: string } & NestedKeys<T>>({
  data = [],
  columns,
  checkbox,
  onMultiSelectChange,
  multiSelect,
  isLoading,
  styles,
  locale,
}: TableRowsProps<T>): JSX.Element => {
  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={100} className="p-3">
            <Loader isFullscreen={false} />
          </td>
        </tr>
      ) : (
        <>
          {data.length > 0 &&
            data.map((row, index) => (
              <tr key={`row-${index}`} className={`${styles.tableRowClasses}`}>
                {checkbox && row.id && (
                  <td>
                    <input
                      id={`cb-row-${index}`}
                      type="checkbox"
                      value={row.id}
                      checked={multiSelect?.includes(row.id)}
                      onChange={(event) =>
                        onMultiSelectChange &&
                        onMultiSelectChange(
                          event.target.value,
                          event.target.checked
                        )
                      }
                      className={styles.checkboxStyles}
                    />
                  </td>
                )}
                {columns.map((column, index2) => (
                  <TableCell
                    key={index2}
                    column={column}
                    index={index2}
                    row={row}
                    locale={locale}
                    styles={styles}
                  />
                ))}
              </tr>
            ))}
          {!data.length && (
            <tr>
              <td
                className={styles.tableRowClasses}
                colSpan={checkbox ? columns.length + 1 : columns.length}
              >
                <div className={styles.noDataStyles}>{locale.noData}</div>
              </td>
            </tr>
          )}
        </>
      )}
    </tbody>
  );
};
