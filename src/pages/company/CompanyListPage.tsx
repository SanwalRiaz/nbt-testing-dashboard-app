import React from 'react';
import { useAtomValue } from 'jotai';
import { companiesAtom, companyListingPage, userAtom } from '../../lib/store';
import { Button } from 'react-bootstrap';
import { useUpdateAtom } from 'jotai/utils';
import { Link, useMatch } from 'react-router-dom';
import CompanyList from '../../components/company/CompanyList';

//type CompanyListPageProps = {}
const CompanyListPage: React.FC<any> = () => {
  const user = useAtomValue(userAtom);
  const companies = useAtomValue(companiesAtom);
  const changePage = useUpdateAtom(companyListingPage);
  const match = useMatch('/company/*');
  return (
    <>
      <div className="d-flex">
        <h2>Company List</h2>
        {user?.admin && (
          <div className="ms-auto">
            <Link to={`${match?.pathname}/new`}>
              <Button>New Company</Button>
            </Link>
          </div>
        )}
      </div>

      <CompanyList companies={companies} changePage={changePage} />
    </>
  );
};
export default CompanyListPage;
