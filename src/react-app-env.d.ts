/// <reference types="react-scripts" />
export declare type PagingItems = {
  count: number;
  pages: number[];
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
  pageSize: number;
  enabled: boolean;
};

export interface ApiResult<T> {
  result: T;
}

export interface ApiResults<T> {
  results: T[];
  paging: PagingItems;
}

export type CompanyPayload = {
  name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
};

type PK = {
  id: number;
};

export type Company = CompanyPayload & PK;

export type ProjectPayload = {
  name: string;
  project_description: string;
  start_date: string;
  end_date: string;
};

export type Project = ProjectPayload & PK & { company_id: number };

export type UserPayload = {
  username: string;
  name: string;
  sex: string;
  address: string;
  mail: string;
  birthdate: string;
  title: string;
  company_id: number;
};

export type User = UserPayload & PK & { admin: boolean };
