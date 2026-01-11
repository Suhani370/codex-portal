import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar />
      <main className="min-h-[80vh]">
        <Home />
      </main>
      <footer className="py-12 text-center border-t border-slate-900 bg-slate-950/50">
        <p className="text-gray-500 text-sm tracking-widest uppercase font-semibold font-mono">
          CodeX Portal &copy; 2026
        </p>
        <p className="text-blue-500/50 text-[10px] mt-2 uppercase tracking-[0.2em]">
          Powered by Google Gemini 1.5 Flash
        </p>
      </footer>
    </div>
  );
}

export default App;