import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/skeleton-loading.scss';
import { useAtomValue } from 'jotai';

import { authenticated } from './lib/store';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export const App: React.FC<any> = () => {
  const isAuthenticated = useAtomValue(authenticated);

  return <>{!isAuthenticated ? <LoginPage /> : <DashboardPage />}</>;
};
