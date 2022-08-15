/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import CompanyForm from '../../components/company/CompanyForm';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { updateCompany } from '../../lib/actions';
import { Company, CompanyPayload } from '../../react-app-env';
import { useAtomValue } from 'jotai';
import { companyAtom, userAtom } from '../../lib/store';

//interface EditCompanyProps {
// name: string,
//}

const EditCompanyPage: React.FC<any> = () => {
  const params = useParams<{ companyId: string }>();
  const user = useAtomValue(userAtom);
  const company = useAtomValue(
    companyAtom(parseInt(params.companyId as string))
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const companyMutation = useMutation<Company, AxiosError, CompanyPayload>(
    (payload) => updateCompany(company?.id!, payload),
    {
      onSuccess: () => {
        toast.success('Company has been updated!');
        queryClient.invalidateQueries([['company', company?.id], 'companies']);
        navigate(`/company/${company?.id}`, { replace: true });
      },
      onError: (err: AxiosError) => {
        toast.error(err.message);
      },
    }
  );

  if (!user?.admin) {
    return <div>You are not authorized to edit companies</div>;
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Link to={`/company/${company?.id}`}>
            <Button variant="light">&laquo; Back</Button>
          </Link>
        </div>
        <h2 className="mb-0">Update Company</h2>
      </div>
      <Row className="mt-3">
        <Col md={12} lg={6}>
          <CompanyForm
            submitForm={(values) => {
              companyMutation.mutate(values);
            }}
            initial={company!}
          />
        </Col>
      </Row>
    </>
  );
};

export default EditCompanyPage;
