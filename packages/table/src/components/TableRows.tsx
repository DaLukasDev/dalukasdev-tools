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
                className={`t-row ${
                  isOdd(index) ? 'bg-grey-100 bg-opacity-40' : ''
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
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                    />
                  </td>
                )}
                {columns.map((column, index2) => {
                  return (
                    <td
                      key={`cell-${index2}`}
                      className={`t-row ${
                        isOdd(index) ? 'bg-grey-100 bg-opacity-40' : ''
                      }`}
                    >
                      {!column.key.toString().includes('actions') ? (
                        <div
                          className={`text-pale text-sm font-medium leading-5  ${
                            column.className
                              ? column.className
                              : 'text-gray-900'
                          }`}
                        >
                          {row[column.key] ? (
                            column.subKey ? (
                              <>
                                {(column.prefix ?? '') +
                                  ' ' +
                                  row[column.key][column.subKey] ?? 'no value'}
                              </>
                            ) : (
                              <>
                                {(column.prefix ?? '') +
                                  ' ' +
                                  (column.date
                                    ? dayjs(row[column.key]).format(
                                        column.dateFormat ?? 'DD/MM/YYYY'
                                      )
                                    : row[column.key])}
                              </>
                            )
                          ) : (
                            'no value'
                          )}
                        </div>
                      ) : (
                        <>
                          {column.actions && ActionButtons(column.actions, row)}
                          {column.actionsAdmin &&
                            ActionButtons(column.actionsAdmin, row)}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          {!data.length && (
            <tr>
              <td
                className="t-row"
                colSpan={checkbox ? columns.length + 1 : columns.length}
              >
                <div className="text-pale text-center text-sm font-medium leading-5 text-gray-900">
                  {'no data'}
                </div>
              </td>
            </tr>
          )}
        </>
      )}
    </tbody>
  );
};
