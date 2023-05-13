import dayjs from 'dayjs';
import formatter from 'dayjs/plugin/customParseFormat.js';
import type { FC } from 'react';
import type { TableCellProps, TableWrapProps } from '../@types';

export const TableCell = <
  T extends {
    [K1 in keyof T]: T[K1] extends object
      ? {
          [K2 in keyof T[K1]]: T[K1][K2];
        }
      : T[K1];
  }
>({
  column: {
    key,
    actions,
    className,
    dateFormat,
    type = 'text',
    prefix,
    subKey,
  },
  row,
  index,
  locale,
  styles,
}: TableCellProps<T>): JSX.Element => {
  dayjs.extend(formatter);

  const TableWrap: FC<TableWrapProps> = ({ children }) => (
    <td
      key={`cell-${index}`}
      className={`${styles.tableCellStyles} ${className ? className : ''}`}
    >
      {children}
    </td>
  );

  if (key === 'actions') {
    if (!actions) return <></>;
    return (
      <TableWrap>
        {actions.length > 1 ? (
          <div className="inline-flex rounded-md" role="group">
            {actions.map((action, index) => (
              <button
                key={`action-${index}`}
                className={action.styles}
                onClick={() => action.onClick(row)}
                onAuxClick={() => action.onAuxClick && action.onAuxClick(row)}
              >
                {action.icon}
              </button>
            ))}
          </div>
        ) : (
          <button
            className={actions[0]?.styles}
            onClick={() => actions[0]?.onClick(row)}
          >
            {actions[0]?.icon}
          </button>
        )}
      </TableWrap>
    );
  }

  const toRender = subKey ? row[key][subKey] : row[key] ?? locale.noValue;

  if (type === 'text') {
    return (
      <TableWrap>{prefix ? `${prefix} ${toRender}` : <>toRender</>}</TableWrap>
    );
  }
  if (type === 'date') {
    return (
      <TableWrap>
        {prefix ? (
          `${prefix} ${dayjs(toRender as string).format(
            dateFormat ?? 'DD/MM/YYYY'
          )}`
        ) : (
          <>{dayjs(toRender as string).format(dateFormat ?? 'DD/MM/YYYY')}</>
        )}
      </TableWrap>
    );
  }
  if (type === 'element') {
    return (
      <TableWrap>
        <></>
      </TableWrap>
    );
  }

  return <TableWrap>{locale.noValue}</TableWrap>;
};
