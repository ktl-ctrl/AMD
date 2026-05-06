import React from 'react';

export default function CoachCard({ summary, recommendations, mealSuggestion }) {
  return (
    <div className="bg-surface-container-low p-stack-lg rounded-xl border-l-4 border-primary shadow-sm">
      <div className="flex items-center gap-2 mb-stack-md">
        <span className="text-2xl">🧠</span>
        <h3 className="font-h3 text-h3 text-on-surface">AI Coach</h3>
      </div>
      <p className="text-body-lg text-on-surface-variant mb-stack-lg leading-relaxed">
        {summary}
      </p>
      
      {recommendations && recommendations.length > 0 && (
        <ul className="mb-stack-lg space-y-2">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="text-body-md text-on-surface-variant flex items-start gap-2">
              <span className="text-primary mt-1 text-sm">•</span>
              {rec}
            </li>
          ))}
        </ul>
      )}

      <div className="bg-white p-stack-md rounded-lg border border-outline-variant flex items-center justify-between group hover:border-primary transition-colors cursor-pointer shadow-sm">
        <div className="flex items-center gap-stack-md">
          <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">restaurant</span>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-outline uppercase mb-1">Recommendation</p>
            <p className="text-body-md text-on-surface font-semibold">{mealSuggestion}</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
      </div>
    </div>
  );
}
