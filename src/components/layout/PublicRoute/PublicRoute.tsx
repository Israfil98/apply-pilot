import { Navigate, Outlet } from 'react-router';
import useAuthStore from '../../../stores/authStore';
import { LoadingSpinner } from '../../common';

const PublicRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
