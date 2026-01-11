import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [page, setPage] = useState('home');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setLoggedInUser(userData);
    setPage('home');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar 
        onLogoClick={() => setPage('home')} 
        onLoginClick={() => setPage('login')}
        user={loggedInUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
        {page === 'home' ? (
          // Yahan hum user pass kar rahe hain taaki Home page par Welcome message dikh sake
          <Home user={loggedInUser} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </main>

      <footer className="py-10 text-center border-t border-slate-900 bg-slate-950/50">
        <p className="text-gray-500 text-sm tracking-widest uppercase font-semibold">
          CodeX Portal &copy; 2026
        </p>
        <p className="text-blue-500/50 text-xs mt-2">
          Intelligence by Google Gemini 1.5 Flash
        </p>
      </footer>
    </div>
  );
}

export default App;