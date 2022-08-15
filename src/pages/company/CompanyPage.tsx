/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewCompanyPage from './NewCompanyPage';
import CompanyListPage from './CompanyListPage';
import CompanyDetailPage from './CompanyDetailPage';
import EditCompanyPage from './EditCompanyPage';

//interface CompanyPageProps {
// name: string,
//}

const CompanyPage: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<CompanyListPage />} />
      <Route path="/new" element={<NewCompanyPage />} />
      <Route path="/:companyId/edit" element={<EditCompanyPage />} />
      <Route path="/:companyId/*" element={<CompanyDetailPage />} />
    </Routes>
  );
};

export default CompanyPage;
