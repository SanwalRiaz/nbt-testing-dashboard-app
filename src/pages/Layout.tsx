/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import Navigation from '../components/Navigation';
import { Container } from 'react-bootstrap';
import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/store';
import { User } from '../react-app-env';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = useAtomValue(userAtom) as User;
  return (
    <Container>
      <Navigation user={user} />
      {children}
    </Container>
  );
};

export default Layout;
