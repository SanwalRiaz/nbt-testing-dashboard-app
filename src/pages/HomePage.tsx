/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../lib/store';
import DashboardInfo from '../components/DashboardInfo';
import { User } from '../react-app-env';

//interface HomePageProps {
// name: string,
//}

const HomePage: React.FC<any> = (props) => {
  const user = useAtomValue(userAtom) as User;
  return <DashboardInfo user={user} />;
};

export default HomePage;
