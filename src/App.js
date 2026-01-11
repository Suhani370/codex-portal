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
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar 
        onLogoClick={() => setPage('home')} 
        onLoginClick={() => setPage('login')}
        user={loggedInUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-10">
        {page === 'home' ? (
          <Home />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        Powered by Google Gemini AI 1.5 Flash
      </footer>
    </div>
  );
}

export default App;