/**
 * Created by yilmaz on 26.07.22.
 * Project: dashboard-app
 */

import React from 'react';
import { validateProject } from '../../lib/validators';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { ProjectPayload } from '../../react-app-env';

interface ProjectEditFormProps {
  initial: ProjectPayload;
  submitForm: (
    values: ProjectPayload,
    formikHelpers: FormikHelpers<ProjectPayload>
  ) => void;
}

const ProjectForm: React.FC<ProjectEditFormProps> = ({
  initial,
  submitForm,
}) => {
  return (
    <Formik
      initialValues={initial}
      validationSchema={validateProject}
      onSubmit={submitForm}
    >
      {({ isValid, handleSubmit, handleChange, values, handleBlur }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name (*)</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Project Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage name="name">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Description (*)</Form.Label>
            <Form.Control
              name="project_description"
              as="textarea"
              rows={3}
              placeholder="Project Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.project_description}
            />
            <ErrorMessage name="project_description">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="start_date"
              type="text"
              placeholder="Start Date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.start_date}
            />
            <ErrorMessage name="start_date">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              name="end_date"
              type="text"
              placeholder="End Date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.end_date}
            />
            <ErrorMessage name="end_date">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!isValid}>
            Save Project
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
