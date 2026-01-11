import React from 'react';

const CalendarView = ({ hackathons }) => {
  // 2026 ke hisab se current view (e.g., March 2026)
  const days = Array.from({ length: 31 }, (_, i) => i + 1); 
  
  const getHackathonsForDay = (day) => {
    return hackathons.filter(h => {
      const hDate = new Date(h.date);
      // Matching day and checking for 2026
      return hDate.getDate() === day && hDate.getFullYear() === 2026;
    });
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Event Calendar</h2>
          <p className="text-blue-400 text-sm font-medium">March 2026</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2.5 bg-slate-900 border border-slate-700 text-gray-400 rounded-xl hover:text-white hover:border-blue-500 transition-all">&larr;</button>
          <button className="p-2.5 bg-slate-900 border border-slate-700 text-gray-400 rounded-xl hover:text-white hover:border-blue-500 transition-all">&rarr;</button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest pb-4">{day}</div>
        ))}
        {days.map(day => {
          const dayHackathons = getHackathonsForDay(day);
          return (
            <div key={day} className="min-h-[110px] p-3 bg-slate-950/40 border border-slate-800/50 rounded-2xl hover:border-slate-600 transition-all group">
              <span className="text-sm font-mono text-slate-600 group-hover:text-blue-400 transition-colors">{day}</span>
              <div className="mt-2 space-y-1.5">
                {dayHackathons.map(h => (
                  <div key={h.id} className="text-[10px] font-bold p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg truncate shadow-sm">
                    {h.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;