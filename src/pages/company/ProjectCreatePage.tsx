/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, ProjectPayload } from '../../react-app-env';
import { AxiosError } from 'axios';
import { createEntity } from '../../lib/actions';
import toast from 'react-hot-toast';
import ProjectForm from '../../components/company/ProjectForm';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../lib/store';

interface ProjectDetailPageProps {
  companyId: number;
}

const ProjectCreatePage: React.FC<ProjectDetailPageProps> = ({ companyId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);

  const projectMutation = useMutation<Project, AxiosError, ProjectPayload>(
    (payload) => createEntity('project', companyId, payload),
    {
      onSuccess: () => {
        toast.success('Project has been updated!');
        queryClient.invalidateQueries(['company_project', companyId]);
        navigate(`/company/${companyId}`, { replace: true });
      },
      onError: (err: AxiosError) => {
        toast.error(err.message);
      },
    }
  );

  if (!user?.admin) {
    return <div>You are not authorized to create projects.</div>;
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
        <h2 className="mb-0">New Project</h2>
      </div>

      <div className="mt-3">
        <ProjectForm
          initial={{
            name: '',
            project_description: '',
            start_date: '',
            end_date: '',
          }}
          submitForm={(values) => projectMutation.mutate(values)}
        />
      </div>
    </>
  );
};

export default ProjectCreatePage;
