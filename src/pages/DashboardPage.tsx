import React, { Suspense } from 'react';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CompanyPage from './company/CompanyPage';
import SkeletonLoading from '../components/utils/SkeletonLoding';

//type DashboardPageProps = {}
const DashboardPage: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<SkeletonLoading count={2} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/*" element={<CompanyPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
export default DashboardPage;
