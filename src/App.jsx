import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Sayfa değişikliklerinde hızlıca yukarı kaydırma bileşeni
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 'smooth' yerine 'auto' kullanarak daha hızlı kaydırma
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;