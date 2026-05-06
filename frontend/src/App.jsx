import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import InputCard from './components/InputCard';
import ProgressCard from './components/ProgressCard';
import CoachCard from './components/CoachCard';
import ScoreCard from './components/ScoreCard';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [meals, setMeals] = useState('');
  const [mood, setMood] = useState('Tired');
  const [availability, setAvailability] = useState('Hostel');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Default data representing the "empty" or "initial" state
  const [data, setData] = useState({
    protein: 40,
    carbs: 60,
    fats: 30,
    energy: 35,
    hydration: 20,
    recovery_score: 'B+',
    summary: "You've had ~18g protein today. You need ~40g more. It's 6pm — one good meal can fix this.",
    recommendations: [],
    meal_suggestion: "Try: 2 rotis + dal + curd = ~35g protein, ~₹60",
    optimal_window: 45
  });

  const handleAnalyze = async () => {
    if (!meals.trim()) {
      setError("Please tell us what you ate today.");
      return;
    }
    
    setIsLoading(true);
    setError('');

    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const response = await axios.post(`${apiUrl}/api/analyze`, {
        meals,
        mood,
        availability
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the AI Coach. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showWelcome) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-surface-dim text-on-surface p-4">
        <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-md border border-outline-variant max-w-lg w-full text-center flex flex-col items-center gap-6">
          <div className="flex items-center justify-center bg-primary-container text-on-primary-container w-16 h-16 rounded-full mb-2">
            <span className="material-symbols-outlined text-4xl">health_and_safety</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface">RECOVER_LOGIC</h1>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-primary">Your AI-powered nutrition recovery companion</p>
            <p className="text-on-surface-variant">Tell us what you ate today. We'll tell you how to recover.</p>
          </div>
          <button 
            onClick={() => setShowWelcome(false)}
            className="mt-4 bg-primary text-on-primary hover:bg-primary/90 px-8 py-4 rounded-xl font-button text-button shadow-sm transition-all hover:shadow-md flex items-center gap-2"
          >
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-container-padding flex flex-col gap-section-gap w-full max-w-[1400px]">
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full py-4 border-b border-outline-variant">
          <h2 className="font-h2 text-h2 font-bold tracking-tighter text-on-surface">Recovery Overview</h2>
          <div className="flex items-center gap-stack-md">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">account_circle</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">settings</span>
          </div>
        </header>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg font-body-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
          {/* Left Column: Recovery Input */}
          <section className="col-span-1 lg:col-span-5 flex flex-col gap-stack-lg">
            <InputCard 
              meals={meals} setMeals={setMeals}
              mood={mood} setMood={setMood}
              availability={availability} setAvailability={setAvailability}
              onSubmit={handleAnalyze}
              isLoading={isLoading}
            />

            {/* Decorative Asset for Context */}
            <div className="relative h-64 rounded-xl overflow-hidden border border-outline-variant shadow-sm bg-surface-variant flex items-center justify-center">
              <img alt="Recovery Meal" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb9RPhxv-VYSzzwsyaqfGphOUU25hkpPHxj-AMZTr1zu0DNOJCaRTl9EzAlO43CkEcpKyGq5FyQepTlN_NNoK6Y9UsUSvL-m6uQaKHsHBxrYyzZjr6IDCfNDEVzlCSNcspQ8squnZUnaZ_84qOKK65FNd2n5JG-oTaChUUkK_hVHb2gaKXco4psNeWqVGmiHyX_c0WFzZD_21rZKkHIz3PJw5nJTBdVq2DOqsnjbEIcDvcQKIb1-lZmSAgcbg098uVKdi8HkTs8x1W" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="font-label-caps text-label-caps bg-primary/90 text-on-primary px-2 py-1 rounded shadow-sm">LATEST ENTRY</span>
              </div>
            </div>
          </section>

          {/* Right Column: Daily Progress & AI Coach */}
          <section className="col-span-1 lg:col-span-7 flex flex-col gap-stack-lg">
            <ProgressCard data={data} />
            <CoachCard 
              summary={data.summary}
              recommendations={data.recommendations}
              mealSuggestion={data.meal_suggestion}
            />
            <ScoreCard 
              optimalWindow={data.optimal_window}
              recoveryScore={data.recovery_score}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
