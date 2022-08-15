import * as yup from 'yup';

export const validateLogin = yup.object().shape({
  email: yup.string().required('Please enter your e-mail.'),
  password: yup.string(),
});

export const validateCompany = yup.object().shape({
  name: yup.string().required('Please enter company name.'),
  company_email: yup.string().email('Please enter company email.'),
  company_address: yup.string().required('Please enter company address.'),
  company_phone: yup.string(),
  company_website: yup.string(),
});

export const validateProject = yup.object().shape({
  name: yup.string().required('Please enter project name.'),
  project_description: yup
    .string()
    .required('Please enter project description.'),
  start_date: yup.string().required('Please enter start project start date.'),
  end_date: yup.date().required('Please enter enter project end date.'),
});
