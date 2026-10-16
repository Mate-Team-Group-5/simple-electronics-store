import React from 'react';

export type Spec = {
  label: string;
  value: string;
};

type Props = {
  specs: Spec[];
  className?: string;
};

export const SpecsList: React.FC<Props> = ({ specs, className = '' }) => {
  return (
    <dl className={`flex flex-col gap-2 text-xs ${className}`}>
      {specs.map(({ label, value }) => (
        <div
          key={label}
          className="flex justify-between gap-4"
        >
          <dt className="text-text-secondary">{label}</dt>
          <dd className="text-right text-text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
};
