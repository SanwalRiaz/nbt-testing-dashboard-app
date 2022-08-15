/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { ApiResults, Project } from '../../react-app-env';
import { Button, Table } from 'react-bootstrap';
import { Link, useMatch } from 'react-router-dom';
import Paging from '../utils/Paging';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../lib/store';

interface CompanyProjectsProps {
  projects: ApiResults<Project>;
  changePage: (page: number) => void;
}

const CompanyProjects: React.FC<CompanyProjectsProps> = ({
  projects,
  changePage,
}) => {
  const match = useMatch('/company/*');
  const user = useAtomValue(userAtom);
  return (
    <>
      <div className="d-flex mb-3">
        {user?.admin && (
          <div className="ms-auto">
            <Link to={`${match?.pathname}/project/new`}>
              <Button size="sm">New Project</Button>
            </Link>
          </div>
        )}
      </div>
      <Table striped size="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.results.map((project, index) => (
            <tr key={index}>
              <td>{project.id}</td>
              <td>
                {user?.admin ? (
                  <Link to={`${match?.pathname}/project/${project.id}`}>
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
              </td>
              <td>{project.project_description}</td>
              <td>{project.start_date}</td>
              <td>{project.end_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paging changePage={changePage} config={projects.paging} />
    </>
  );
};

export default CompanyProjects;
