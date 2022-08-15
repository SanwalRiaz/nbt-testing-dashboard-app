/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Table } from 'react-bootstrap';
import { Link, useMatch } from 'react-router-dom';
import Paging from '../utils/Paging';
import { ApiResults, Company } from '../../react-app-env';

interface CompanyListProps {
  companies: ApiResults<Company>;
  changePage: (page: number) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, changePage }) => {
  const match = useMatch('/company/*');
  return (
    <>
      <Table striped size="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {companies.results.map((company, index) => (
            <tr key={index}>
              <td>{company.id}</td>
              <td>
                <Link to={`${match?.pathname}/${company.id}`}>
                  {company.name}
                </Link>
              </td>
              <td>{company.company_address}</td>
              <td>{company.company_phone}</td>
              <td>{company.company_email}</td>
              <td>{company.company_website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paging changePage={changePage} config={companies.paging} />
    </>
  );
};

export default CompanyList;
