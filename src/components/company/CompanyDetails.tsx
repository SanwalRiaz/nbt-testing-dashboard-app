/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useAtomValue } from 'jotai';
import {
  companyProjectsAtom,
  companyUsersAtom,
  projectListingPage,
  userListingPage,
} from '../../lib/store';
import CompanyProjects from './CompanyProjects';
import { useUpdateAtom } from 'jotai/utils';
import CompanyUsers from './CompanyUsers';

interface CompanyDetailsProps {
  companyId: number;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyId }) => {
  const projects = useAtomValue(companyProjectsAtom(companyId));
  const changePage = useUpdateAtom(projectListingPage);

  const users = useAtomValue(companyUsersAtom(companyId));
  const changeUserPage = useUpdateAtom(userListingPage);
  return (
    <Tabs
      defaultActiveKey="projects"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="projects" title="Projects">
        {projects && (
          <CompanyProjects projects={projects} changePage={changePage} />
        )}
      </Tab>
      <Tab eventKey="users" title="Users">
        {users && <CompanyUsers users={users} changePage={changeUserPage} />}
      </Tab>
    </Tabs>
  );
};

export default CompanyDetails;
