import React from 'react';

export default function ScoreCard({ optimalWindow, recoveryScore }) {
  return (
    <div className="grid grid-cols-2 gap-stack-md">
      <div className="bg-white p-stack-md rounded-xl border border-outline-variant flex flex-col gap-unit shadow-sm">
        <span className="font-label-caps text-label-caps text-outline uppercase">Optimal Window</span>
        <div className="flex items-baseline gap-2">
          <span className="font-stats-display text-stats-display text-on-surface">{optimalWindow}</span>
          <span className="text-on-surface-variant text-sm">min remaining</span>
        </div>
      </div>
      <div className="bg-white p-stack-md rounded-xl border border-outline-variant flex flex-col gap-unit shadow-sm">
        <span className="font-label-caps text-label-caps text-outline uppercase">Recovery Score</span>
        <div className="flex items-baseline gap-2">
          <span className="font-stats-display text-stats-display text-on-surface">{recoveryScore}</span>
          <span className="text-primary text-sm font-bold">Trending Up</span>
        </div>
      </div>
    </div>
  );
}
