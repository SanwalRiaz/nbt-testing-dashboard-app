/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React, { useEffect } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAtomValue } from 'jotai';
import {
  projectAtom,
  selectedCompany,
  selectedProject,
  userAtom,
} from '../../lib/store';
import { useUpdateAtom } from 'jotai/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, ProjectPayload } from '../../react-app-env';
import { AxiosError } from 'axios';
import { updateEntity } from '../../lib/actions';
import toast from 'react-hot-toast';
import ProjectForm from '../../components/company/ProjectForm';

interface ProjectDetailPageProps {
  companyId: number;
}

const ProjectEditPage: React.FC<ProjectDetailPageProps> = ({ companyId }) => {
  const params = useParams<{ projectId: string }>();
  const selectProject = useUpdateAtom(selectedProject);
  const selectCompany = useUpdateAtom(selectedCompany);
  const user = useAtomValue(userAtom);
  const project = useAtomValue(projectAtom);
  const match = useMatch('/company/*');
  useEffect(() => {
    selectProject(parseInt(params.projectId as string));
    selectCompany(companyId);
  }, [params, selectProject, companyId, selectCompany]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const projectMutation = useMutation<Project, AxiosError, ProjectPayload>(
    (payload) =>
      updateEntity('project', companyId, project?.id as number, payload),
    {
      onSuccess: () => {
        toast.success('Project has been updated!');
        queryClient.invalidateQueries([
          'company_project',
          companyId,
          project?.id,
        ]);
        navigate(`/company/${companyId}`, { replace: true });
      },
      onError: (err: AxiosError) => {
        toast.error(err.message);
      },
    }
  );

  if (!user?.admin) {
    return <div>You are not authorized to edit projects.</div>;
  }

  if (!project) {
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
        <h2 className="mb-0">{project?.name}</h2>
        <div className="ms-auto">
          <Link to={`${match?.pathname}/edit`}>
            <Button size="sm">Edit Project</Button>
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <ProjectForm
          initial={project}
          submitForm={(values) => projectMutation.mutate(values)}
        />
      </div>
    </>
  );
};

export default ProjectEditPage;
