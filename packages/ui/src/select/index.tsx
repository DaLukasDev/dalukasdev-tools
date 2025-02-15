import type { FC, JSX } from 'react';

type SelectProps = JSX.IntrinsicElements['select'] & {
  options: { label: string; value: number }[];
  value?: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Select: FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select
      className={`block w-full min-w-fit rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white${
        className ? ` ${className}` : ''
      }`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
