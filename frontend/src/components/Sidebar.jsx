import React from 'react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-stack-lg z-40 bg-white border-r border-outline-variant w-64">
      <div className="px-6 mb-stack-lg">
        <h1 className="font-h3 text-h3 font-black text-primary">RECOVER_LOGIC</h1>
      </div>
      <div className="flex-1 space-y-2">
        <div className="bg-primary-container text-on-primary-container rounded-lg mx-2 px-4 py-3 flex items-center gap-3">
          <span className="material-symbols-outlined fill" data-icon="dashboard">dashboard</span>
          <span className="font-label-caps text-label-caps">Dashboard</span>
        </div>
        <div className="text-on-surface-variant hover:bg-surface-variant rounded-lg mx-2 px-4 py-3 flex items-center gap-3 transition-all cursor-pointer">
          <span className="material-symbols-outlined" data-icon="history">history</span>
          <span className="font-label-caps text-label-caps">History</span>
        </div>
        <div className="text-on-surface-variant hover:bg-surface-variant rounded-lg mx-2 px-4 py-3 flex items-center gap-3 transition-all border-b-2 border-primary/50 cursor-pointer">
          <span className="material-symbols-outlined" data-icon="nutrition">nutrition</span>
          <span className="font-label-caps text-label-caps">Nutrients</span>
        </div>
        <div className="text-on-surface-variant hover:bg-surface-variant rounded-lg mx-2 px-4 py-3 flex items-center gap-3 transition-all cursor-pointer">
          <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
          <span className="font-label-caps text-label-caps">Coach</span>
        </div>
      </div>
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl mb-4 border border-outline-variant/30">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
            <img alt="Athlete Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABAI5-jxcjYjMfI6wYIy0pVHevt606eVaQHHvYn_lYWaqaLpGILxNiEX7oxuUqQhs-DTqNngve1N0xjIlGPFEP9boKqdsI5GoRmo6fcN7tXtFLtdAqDWHsHcR-dYkifwVZ2EadHG5yNTDUbFE0bDW4qU2oawt1MeDQfkLqSKddOMzBQHmWtAOCd_mzQZSrFyTJ5yVfI5hzQpopnpJVmZ0NyKXreHkhf_lZ3gABYoaybQKJGzSS4bcJOf98CnxJ8ZimYtnv8bw24eof" />
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface">Athlete Name</p>
            <p className="text-[10px] text-primary font-bold">Elite Recovery Mode</p>
          </div>
        </div>
        <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest text-[10px] shadow-sm">
          Log New Meal
        </button>
      </div>
    </aside>
  );
}
