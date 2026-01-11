
import React from 'react';
import { Hackathon } from '../types';

interface CalendarViewProps {
  hackathons: Hackathon[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ hackathons }) => {
  // Simple month view for November/December 2024
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid
  
  const getHackathonsForDay = (day: number) => {
    // Basic day matching logic for mock
    return hackathons.filter(h => {
      const hDate = new Date(h.date);
      return hDate.getDate() === day && hDate.getMonth() === 10; // November
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">November 2024</h2>
        <div className="flex space-x-2">
          <button className="p-2 bg-slate-800 text-gray-400 rounded-lg hover:text-white">&larr;</button>
          <button className="p-2 bg-slate-800 text-gray-400 rounded-lg hover:text-white">&rarr;</button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-mono text-slate-500 py-2">{day}</div>
        ))}
        {days.map(day => {
          const dayHackathons = getHackathonsForDay(day);
          return (
            <div key={day} className={`min-h-[100px] p-2 bg-slate-950/50 border border-slate-800/50 rounded-lg ${day > 30 ? 'opacity-20' : ''}`}>
              <span className="text-xs font-mono text-slate-600">{day > 30 ? day - 30 : day}</span>
              <div className="mt-1 space-y-1">
                {dayHackathons.map(h => (
                  <div key={h.id} className="text-[9px] p-1 bg-purple-500/20 border border-purple-500/30 text-purple-200 rounded truncate cursor-pointer hover:bg-purple-500/40 transition-colors">
                    {h.name}
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
