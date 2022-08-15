import { apiClient } from './apiClient';
import {
  ApiResult,
  ApiResults,
  Company,
  CompanyPayload,
} from '../react-app-env';

const users = {
  'admin@test.com': {
    username: 'michael25',
    name: 'Admin User',
    sex: 'M',
    address: '0279 Juan Spurs Apt. 316\nBurtontown, MA 54119',
    mail: 'admin@test.com',
    birthdate: '1937-11-26',
    title: 'Brewing technologist',
    company_id: 100,
    id: 1,
    admin: true,
  },
  'user@test.com': {
    username: 'uarellano',
    name: 'Normal User',
    sex: 'F',
    address: '457 Hicks Manors\nGonzalezburgh, DE 42979',
    mail: 'user@test.com',
    birthdate: '1978-05-29',
    title: 'Commercial horticulturist',
    company_id: 100,
    id: 2,
    admin: false,
  },
};

export const login = (email: string, password: string) => {
  const user = users[email as keyof typeof users];
  if (!user) {
    return false;
  }

  return user;
};

// company
export const getCompanies = async (page: number = 1) => {
  const res = await apiClient.get<ApiResults<Company>>(`/company`, {
    params: {
      page,
    },
  });
  return res.data;
};

export const getCompany = async (id: number) => {
  const res = await apiClient.get<ApiResult<Company>>(`/company/${id}`, {});
  return res.data?.result;
};

export const createCompany = async (payload: CompanyPayload) => {
  const res = await apiClient.post<ApiResult<Company>>(`/company`, payload);
  return res.data?.result;
};

export const updateCompany = async (id: number, payload: CompanyPayload) => {
  const res = await apiClient.put<ApiResult<Company>>(
    `/company/${id}`,
    payload
  );
  return res.data?.result;
};

export const deleteCompany = async (id: number) => {
  await apiClient.delete(`/company/${id}`);
};
// # company

// company Generics
export const getEntities = async <T>(
  entity: string,
  company: number,
  page: number = 1
) => {
  const res = await apiClient.get<ApiResults<T>>(
    `/company/${company}/${entity}`,
    {
      params: {
        page,
      },
    }
  );
  return res.data;
};

export const getEntity = async <T>(
  entity: string,
  company: number,
  id: number
) => {
  const res = await apiClient.get<ApiResult<T>>(
    `/company/${company}/${entity}/${id}`,
    {}
  );
  return res.data?.result;
};

export const createEntity = async <T, P>(
  entity: string,
  company: number,
  payload: P
) => {
  const res = await apiClient.post<ApiResult<T>>(
    `/company/${company}/${entity}`,
    payload
  );
  return res.data?.result;
};

export const updateEntity = async <T, P>(
  entity: string,
  company: number,
  id: number,
  payload: P
) => {
  const res = await apiClient.put<ApiResult<T>>(
    `/company/${company}/${entity}/${id}`,
    payload
  );
  return res.data?.result;
};

export const deleteEntity = async (
  entity: string,
  company: number,
  id: number
) => {
  await apiClient.delete(`/company/${company}/${entity}/${id}`);
};
// # company Generics
