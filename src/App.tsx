import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { TemplateCategoriesPage } from './pages/TemplateCategoriesPage';
import { CategoryTemplatesPage } from './pages/CategoryTemplatesPage';
import { FeatureDetailsPage } from './pages/FeatureDetailsPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SuperAdminOverview } from './pages/dashboard/SuperAdminOverview';
import { CompanyAdminOverview } from './pages/dashboard/CompanyAdminOverview';
import { CompanyUserOverview } from './pages/dashboard/CompanyUserOverview';
import { CollegeAdminOverview } from './pages/dashboard/CollegeAdminOverview';
import { CollegeUserOverview } from './pages/dashboard/CollegeUserOverview';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/templates" element={<TemplateCategoriesPage />} />
            <Route path="/templates/:category" element={<CategoryTemplatesPage />} />
            <Route path="/feature/:slug" element={<FeatureDetailsPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/super/overview" replace />} />

              {/* Super Admin */}
              <Route path="super/overview" element={<SuperAdminOverview />} />
              <Route path="super/*" element={<SuperAdminOverview />} />

              {/* Company Admin */}
              <Route path="company-admin/overview" element={<CompanyAdminOverview />} />
              <Route path="company-admin/*" element={<CompanyAdminOverview />} />

              {/* Company User */}
              <Route path="company-user/profile" element={<CompanyUserOverview />} />
              <Route path="company-user/*" element={<CompanyUserOverview />} />

              {/* College Admin */}
              <Route path="college-admin/overview" element={<CollegeAdminOverview />} />
              <Route path="college-admin/*" element={<CollegeAdminOverview />} />

              {/* College User */}
              <Route path="college-user/profile" element={<CollegeUserOverview />} />
              <Route path="college-user/*" element={<CollegeUserOverview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
