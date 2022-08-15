import React from 'react';
import { Alert } from 'react-bootstrap';
import { User } from '../react-app-env';

type DashboardInfoProps = { user: User };
const DashboardInfo: React.FC<DashboardInfoProps> = ({ user }) => {
  return (
    <Alert>
      <Alert.Heading>Welcome {user.name}</Alert.Heading>
      <p>Please use navigation above to navigate through the application.</p>
    </Alert>
  );
};
export default DashboardInfo;
