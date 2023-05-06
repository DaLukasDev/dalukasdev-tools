import type { FC } from 'react';

type SelectProps = JSX.IntrinsicElements['select'] & {
  options: Array<{ label: string; value: number }>;
  value?: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Select: FC<SelectProps> = ({ options, className, ...props }) => {
  return (
    <select
      className={`block w-full min-w-fit rounded-lg border border-gray-300 bg-white p-2.5 pr-10 text-sm text-gray-900 ${className}`}
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
