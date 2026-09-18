import { Navigate, Outlet } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { buildLocalizedPath } from '../../i18n/utils';
import { useAuthSession } from '../hooks/useAuthSession';

interface RequireAuthProps {
  adminOnly?: boolean;
}

export const RequireAuth = ({ adminOnly = false }: RequireAuthProps) => {
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuthSession();

  if (!isAuthenticated) {
    return <Navigate to={buildLocalizedPath(language, '/login')} replace />;
  }

  if (adminOnly && !user.isAdmin && user.role !== 'admin') {
    return <Navigate to={buildLocalizedPath(language, '/dashboard')} replace />;
  }

  return <Outlet />;
};
