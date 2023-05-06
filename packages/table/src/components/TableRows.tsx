import { Loader } from '@dalukasdev/ui';
import { isOdd } from '@dalukasdev/utils';
import dayjs from 'dayjs';
import formatter from 'dayjs/plugin/customParseFormat';
import { TableActionsProps, TableRowsProps } from '../@types';

export const TableRows = <T extends { [x: string]: any }>({
  data = [],
  columns,
  checkbox,
  onMultiSelectChange,
  multiSelect,
  isLoading,
  styles,
  locale,
}: TableRowsProps<T>): JSX.Element => {
  dayjs.extend(formatter);

  const ActionButtons = (actions: TableActionsProps<T>[], rowData: T) => {
    return actions.length > 1 ? (
      <div className="inline-flex rounded-md" role="group">
        {actions.map((action, index) => (
          <button
            key={`action-${index}`}
            className={action.styles}
            onClick={() => action.onClick(rowData)}
          >
            {action.icon}
          </button>
        ))}
      </div>
    ) : (
      actions.length === 1 && (
        <button
          className={actions[0]?.styles}
          onClick={() => actions[0]?.onClick(rowData)}
        >
          {actions[0]?.icon}
        </button>
      )
    );
  };

  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={100} className="pt-3">
            <Loader isFullscreen={false} />
          </td>
        </tr>
      ) : (
        <>
          {data.length > 0 &&
            data.map((row, index) => (
              <tr
                key={`row-${index}`}
                className={`${styles.tableRowClasses} ${
                  isOdd(index) ? styles.tableRowIsOddClasses : ''
                }`}
              >
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
                {columns.map((column, index2) => {
                  return (
                    <td
                      key={`cell-${index2}`}
                      className={`${styles.tableCellStyles} ${
                        isOdd(index) ? styles.tableRowIsOddClasses : ''
                      }`}
                    >
                      {!column.key.toString().includes('actions') ? (
                        <div
                          className={`${styles.tableCellStyles} ${
                            column.className ? column.className : ''
                          }`}
                        >
                          {row[column.key] ? (
                            column.subKey ? (
                              <>
                                {(column.prefix ?? '') +
                                  ' ' +
                                  row[column.key][column.subKey] ??
                                  locale.noValue}
                              </>
                            ) : (
                              <>
                                {(column.prefix ?? '') +
                                  ' ' +
                                  (column.isDate
                                    ? dayjs(row[column.key]).format(
                                        column.dateFormat ?? 'DD/MM/YYYY'
                                      )
                                    : row[column.key])}
                              </>
                            )
                          ) : (
                            locale.noValue
                          )}
                        </div>
                      ) : (
                        column.actions && ActionButtons(column.actions, row)
                      )}
                    </td>
                  );
                })}
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
