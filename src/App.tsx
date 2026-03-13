import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from './components/common';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const AddApplicationPage = lazy(() => import('./pages/AddApplicationPage'));
const ApplicationDetailPage = lazy(
  () => import('./pages/ApplicationDetailPage'),
);

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Public routes — redirect to dashboard if logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes — redirect to login if not logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<AddApplicationPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
