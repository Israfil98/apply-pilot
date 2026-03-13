import { Navigate } from 'react-router';
import useAuthStore from '../../../stores/authStore';
import { LoadingSpinner } from '../../common';
import { AppLayout } from '../AppLayout';

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
};

export default ProtectedRoute;
