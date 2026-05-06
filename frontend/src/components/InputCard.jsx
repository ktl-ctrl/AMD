import React from 'react';

export default function InputCard({ meals, setMeals, mood, setMood, availability, setAvailability, onSubmit, isLoading }) {
  return (
    <div className="bg-white p-stack-lg rounded-xl border border-outline-variant shadow-sm">
      <h3 className="font-h2 text-h2 text-primary mb-stack-md">Recovery Input</h3>
      <form 
        className="space-y-stack-md" 
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      >
        <div className="space-y-unit">
          <label className="font-label-caps text-label-caps text-outline uppercase">What did you eat today?</label>
          <textarea 
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            className="w-full h-48 bg-surface-bright border border-outline-variant rounded-lg p-4 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none placeholder:text-outline/50" 
            placeholder="e.g. 2 rotis and dal for lunch..."
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-stack-md">
          <div className="space-y-unit">
            <label className="font-label-caps text-label-caps text-outline uppercase">How are you feeling?</label>
            <div className="relative">
              <select 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full appearance-none bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:border-primary outline-none cursor-pointer"
              >
                <option value="Tired">Tired</option>
                <option value="Fine">Fine</option>
                <option value="Energetic">Energetic</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
            </div>
          </div>
          <div className="space-y-unit">
            <label className="font-label-caps text-label-caps text-outline uppercase">What's available to you?</label>
            <div className="relative">
              <select 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full appearance-none bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:border-primary outline-none cursor-pointer"
              >
                <option value="Hostel">Hostel</option>
                <option value="Home">Home</option>
                <option value="Outside">Outside</option>
                <option value="Canteen">Canteen</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-[56px] mt-stack-md bg-primary-container text-on-primary-container font-h2 text-h2 font-bold rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze My Day'}
          {!isLoading && <span className="material-symbols-outlined">analytics</span>}
        </button>
      </form>
    </div>
  );
}
