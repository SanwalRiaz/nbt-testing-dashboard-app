/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';
import {
  companyUserAtom,
  selectedCompany,
  selectedUser,
} from '../../lib/store';
import { useAtomValue } from 'jotai';
import { Button, Card } from 'react-bootstrap';

interface UserDetailPageProps {
  companyId: number;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ companyId }) => {
  const params = useParams<{ userId: string }>();
  const selectUser = useUpdateAtom(selectedUser);
  const selectCompany = useUpdateAtom(selectedCompany);
  const user = useAtomValue(companyUserAtom);
  useEffect(() => {
    selectUser(parseInt(params.userId as string));
    selectCompany(companyId);
  }, [params, companyId, selectUser, selectCompany]);

  if (!user) {
    return null;
  }

  return (
    <>
      <hr />
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Link to={`/company/${companyId}`}>
            <Button variant="light">&laquo; Back</Button>
          </Link>
        </div>
        <h2 className="mb-0">{user?.name}</h2>
      </div>
      <Card style={{ width: '18rem' }} className="mt-3">
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>{user.address}</Card.Text>
          <Card.Text>
            {user.mail}
            <br />
            {user.birthdate}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserDetailPage;
