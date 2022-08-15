/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React, { Suspense } from 'react';
import { Link, Route, Routes, useMatch, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAtomValue } from 'jotai';
import { companyAtom } from '../../lib/store';
import CompanyCard from '../../components/company/CompanyCard';
import CompanyDetails from '../../components/company/CompanyDetails';
import ProjectEditPage from './ProjectEditPage';
import SkeletonLoading from '../../components/utils/SkeletonLoding';
import ProjectCreatePage from './ProjectCreatePage';
import UserDetailPage from './UserDetailPage';

//interface CompanyDetailPageProps {
// name: string,
//}

const CompanyDetailPage: React.FC<any> = (props) => {
  const params = useParams<{ companyId: string }>();
  const company = useAtomValue(
    companyAtom(parseInt(params.companyId as string))
  );

  const match = useMatch('/company/*');

  if (!company) {
    return null;
  }

  return (
    <Suspense fallback={<SkeletonLoading count={1} />}>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Link to={`/company`}>
            <Button variant="light">&laquo; Back</Button>
          </Link>
        </div>
        <h2 className="mb-0">Company Detail</h2>
        <div className="ms-auto">
          <Link to={`${match?.pathname}/edit`}>
            <Button>Edit Company</Button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <CompanyCard company={company} />
      </div>

      <div className="mt-3">
        <Routes>
          <Route
            path={`project/new`}
            element={<ProjectCreatePage companyId={company.id} />}
          />
          <Route
            path={`project/:projectId`}
            element={<ProjectEditPage companyId={company.id} />}
          />
          <Route
            path={`user/:userId`}
            element={<UserDetailPage companyId={company.id} />}
          />
          <Route
            path={``}
            element={<CompanyDetails companyId={company.id} />}
          />
        </Routes>
      </div>
    </Suspense>
  );
};

export default CompanyDetailPage;
