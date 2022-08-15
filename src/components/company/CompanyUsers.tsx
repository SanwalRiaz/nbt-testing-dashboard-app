/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { ApiResults, User } from '../../react-app-env';
import { Table } from 'react-bootstrap';
import { Link, useMatch } from 'react-router-dom';
import Paging from '../utils/Paging';

interface CompanyUsersProps {
  users: ApiResults<User>;
  changePage: (page: number) => void;
}

const CompanyUsers: React.FC<CompanyUsersProps> = ({ users, changePage }) => {
  const match = useMatch('/company/*');
  return (
    <>
      <Table striped size="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Title</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.results.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>
                <Link to={`${match?.pathname}/user/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.username}</td>
              <td>{user.mail}</td>
              <td>{user.title}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paging changePage={changePage} config={users.paging} />
    </>
  );
};

export default CompanyUsers;
