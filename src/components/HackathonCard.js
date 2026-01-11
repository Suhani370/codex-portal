import React, { useState } from 'react';

const HackathonCard = ({ hackathon }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${hackathon.type === 'Online' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
          {hackathon.type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{hackathon.title}</h3>
      <p className="text-slate-400 text-sm mb-4">📍 {hackathon.city}</p>
      <div className="flex justify-between items-center text-sm text-slate-300 mb-6">
        <span>📅 {hackathon.date}</span>
      </div>
      <button 
        onClick={() => setShowModal(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-all"
      >
        View Details
      </button>

      {/* Modal / Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">{hackathon.title}</h2>
            <div className="space-y-4 text-slate-300">
              <p><strong>📍 Location:</strong> {hackathon.city} ({hackathon.type})</p>
              <p><strong>📅 Event Date:</strong> {hackathon.date}</p>
              <p><strong>⏳ Deadline:</strong> 10th March 2026</p>
              <p><strong>💰 Prize Pool:</strong> ₹50,000 + Swags</p>
              <p><strong>📝 Info:</strong> Build innovative solutions and network with industry experts. Open for all students and developers.</p>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-8 w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded-xl transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonCard;