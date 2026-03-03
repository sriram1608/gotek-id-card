import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { TemplateCategoriesPage } from './pages/TemplateCategoriesPage';
import { CategoryTemplatesPage } from './pages/CategoryTemplatesPage';
import { FeatureDetailsPage } from './pages/FeatureDetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplateCategoriesPage />} />
          <Route path="/templates/:category" element={<CategoryTemplatesPage />} />
          <Route path="/feature/:slug" element={<FeatureDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
