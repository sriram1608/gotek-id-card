
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
import { AuthPage } from './pages/AuthPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplateCategoriesPage />} />
          <Route path="/templates/:category" element={<CategoryTemplatesPage />} />
          <Route path="/feature/:slug" element={<FeatureDetailsPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<AuthPage />} />

          {/* Dashboards Wrapper */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

            {/* Super Admin */}
            <Route path="super-admin/dashboard" element={<ProtectedRoute allowedRoles={['super-admin']}><SuperAdminOverview /></ProtectedRoute>} />

            {/* Company Admin */}
            <Route path="company-admin/dashboard" element={<ProtectedRoute allowedRoles={['company-admin']}><CompanyAdminOverview /></ProtectedRoute>} />

            {/* Company User */}
            <Route path="company-user/dashboard" element={<ProtectedRoute allowedRoles={['company-user']}><CompanyUserOverview /></ProtectedRoute>} />

            {/* College Admin */}
            <Route path="college-admin/dashboard" element={<ProtectedRoute allowedRoles={['college-admin']}><CollegeAdminOverview /></ProtectedRoute>} />

            {/* College User */}
            <Route path="college-user/dashboard" element={<ProtectedRoute allowedRoles={['college-user']}><CollegeUserOverview /></ProtectedRoute>} />

          </Route>

          {/* Fallback */}
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
