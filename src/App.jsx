import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ProblemStatement from './pages/ProblemStatement';
import TechnicalDocs from './pages/TechnicalDocs';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-stone-900 dark:text-stone-100 transition-colors duration-300">
          <Navbar />
          <ScrollProgress />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ProblemStatement />} />
              <Route path="/technical-documentation" element={<TechnicalDocs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
