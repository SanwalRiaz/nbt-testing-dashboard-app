import { atomFamily, atomWithStorage } from 'jotai/utils';
import { ApiResults, Company, Project, User } from '../react-app-env';
import { atomWithQuery } from 'jotai/query';
import { atom } from 'jotai';
import { getCompanies, getCompany, getEntities, getEntity } from './actions';
import { AxiosError } from 'axios';
export const authenticated = atomWithStorage<boolean>('authenticated', false);
export const userAtom = atomWithStorage<User | null>('user', null);

export const companyListingPage = atom(1);
export const companiesAtom = atomWithQuery<ApiResults<Company>, AxiosError>(
  (get) => ({
    queryKey: ['companies', get(companyListingPage)],
    queryFn: () => getCompanies(get(companyListingPage)),
  })
);

export const companyAtom = atomFamily((companyId: number) =>
  atomWithQuery<Company, AxiosError>(() => ({
    queryKey: ['company', companyId],
    queryFn: () => getCompany(companyId),
    enabled: !!companyId,
  }))
);

export const userListingPage = atom(1);
export const companyUsersAtom = atomFamily((companyId: number) =>
  atomWithQuery<ApiResults<User>, AxiosError>((get) => ({
    queryKey: ['company_users', companyId, get(userListingPage)],
    queryFn: () => getEntities('user', companyId, get(userListingPage)),
    enabled: !!companyId,
  }))
);

export const projectListingPage = atom(1);
export const companyProjectsAtom = atomFamily((companyId: number) =>
  atomWithQuery<ApiResults<Project>, AxiosError>((get) => ({
    queryKey: ['company_project', companyId, get(projectListingPage)],
    queryFn: () => getEntities('project', companyId, get(projectListingPage)),
    enabled: !!companyId,
  }))
);

export const selectedCompany = atom<number | null>(null);
export const selectedProject = atom<number | null>(null);
export const projectAtom = atomWithQuery<Project, AxiosError>((get) => ({
  queryKey: ['company_project', get(selectedCompany), get(selectedProject)],
  queryFn: () =>
    getEntity(
      'project',
      get(selectedCompany) as number,
      get(selectedProject) as number
    ),
  enabled: !!get(selectedCompany) && !!get(selectedProject),
}));

export const selectedUser = atom<number | null>(null);
export const companyUserAtom = atomWithQuery<User, AxiosError>((get) => ({
  queryKey: ['company_user', get(selectedCompany), get(selectedUser)],
  queryFn: () =>
    getEntity(
      'user',
      get(selectedCompany) as number,
      get(selectedUser) as number
    ),
  enabled: !!get(selectedCompany) && !!get(selectedUser),
}));
