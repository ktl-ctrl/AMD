import React from 'react';

const ProgressBar = ({ label, percentage, colorClass, bgClass, textColorClass }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="font-label-caps text-label-caps text-outline uppercase">{label}</span>
      <span className={`font-stats-display text-stats-display ${textColorClass}`}>{percentage}%</span>
    </div>
    <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
      <div 
        className={`h-full ${bgClass} rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function ProgressCard({ data }) {
  const bars = [
    { label: 'Protein', key: 'protein', colorClass: 'text-primary', bgClass: 'bg-primary-container' },
    { label: 'Carbs', key: 'carbs', colorClass: 'text-secondary', bgClass: 'bg-secondary-fixed-dim' },
    { label: 'Fats', key: 'fats', colorClass: 'text-tertiary', bgClass: 'bg-tertiary-fixed-dim' },
    { label: 'Energy', key: 'energy', colorClass: 'text-on-secondary-container', bgClass: 'bg-secondary-container' },
    { label: 'Hydration', key: 'hydration', colorClass: 'text-outline', bgClass: 'bg-outline' },
  ];

  return (
    <div className="bg-white p-stack-lg rounded-xl border border-outline-variant shadow-sm">
      <h3 className="font-h2 text-h2 text-on-surface mb-stack-lg">Daily Progress</h3>
      <div className="space-y-stack-md">
        {bars.map((bar) => (
          <ProgressBar 
            key={bar.key}
            label={bar.label} 
            percentage={data[bar.key] || 0} 
            textColorClass={bar.colorClass}
            bgClass={bar.bgClass}
          />
        ))}
      </div>
    </div>
  );
}
