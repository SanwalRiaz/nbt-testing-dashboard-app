/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import CompanyForm from '../../components/company/CompanyForm';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { createCompany } from '../../lib/actions';
import { Company, CompanyPayload } from '../../react-app-env';
//interface NewCompanyProps {
// name: string,
//}

const NewCompanyPage: React.FC<any> = () => {
  let navigate = useNavigate();

  const queryClient = useQueryClient();
  const companyMutation = useMutation<Company, AxiosError, CompanyPayload>(
    (payload) => createCompany(payload),
    {
      onSuccess: () => {
        toast.success('Company has been created!');
        queryClient.invalidateQueries(['companies']);
        navigate('/company', { replace: true });
      },
      onError: (err: AxiosError) => {
        toast.error(err.message);
      },
    }
  );

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Link to={`/company`}>
            <Button variant="light">&laquo; Back</Button>
          </Link>
        </div>
        <h2 className="mb-0">Create New Company</h2>
      </div>
      <Row className="mt-3">
        <Col md={12} lg={6}>
          <CompanyForm
            submitForm={(values) => {
              companyMutation.mutate(values);
            }}
            initial={{
              name: '',
              company_address: '',
              company_phone: '',
              company_email: '',
              company_website: '',
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewCompanyPage;
