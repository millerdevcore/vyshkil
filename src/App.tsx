import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { TopicScreen } from './screens/TopicScreen';
import { QuizScreen } from './screens/QuizScreen';
import { FinalTestScreen } from './screens/FinalTestScreen';
import { AboutScreen } from './screens/AboutScreen';
import './styles/app.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/topic/:id" element={<TopicScreen />} />
        <Route path="/quiz/:id" element={<QuizScreen />} />
        <Route path="/final" element={<FinalTestScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Routes>
    </HashRouter>
  );
}
