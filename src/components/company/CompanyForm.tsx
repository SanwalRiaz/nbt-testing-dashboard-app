/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { validateCompany } from '../../lib/validators';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { CompanyPayload } from '../../react-app-env';

interface CompanyFormProps {
  initial: CompanyPayload;
  submitForm: (
    values: CompanyPayload,
    formikHelpers: FormikHelpers<CompanyPayload>
  ) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initial, submitForm }) => {
  return (
    <Formik
      initialValues={initial}
      validationSchema={validateCompany}
      onSubmit={submitForm}
    >
      {({ isValid, handleSubmit, handleChange, values, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name (*)</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Company Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage name="name">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Email (*)</Form.Label>
            <Form.Control
              name="company_email"
              type="text"
              placeholder="Company Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company_email}
            />
            <ErrorMessage name="company_email">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Address (*)</Form.Label>
            <Form.Control
              name="company_address"
              as="textarea"
              rows={3}
              placeholder="Company Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company_address}
            />
            <ErrorMessage name="company_address">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="company_phone"
              type="text"
              placeholder="Company Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company_phone}
            />
            <ErrorMessage name="company_phone">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              name="company_website"
              type="text"
              placeholder="Company Website"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company_website}
            />
            <ErrorMessage name="company_website">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!isValid}>
            Save Company
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
