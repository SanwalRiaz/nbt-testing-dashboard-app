import React from 'react';
import { authenticated, userAtom } from '../lib/store';
import { useUpdateAtom } from 'jotai/utils';
import { Button, Container, Form } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { validateLogin } from '../lib/validators';
import { login } from '../lib/actions';
import toast from 'react-hot-toast';

//type LoginPageProps = {}
const LoginPage: React.FC<any> = () => {
  const authenticate = useUpdateAtom(authenticated);
  const setUser = useUpdateAtom(userAtom);
  return (
    <Container>
      <main className="form-signin w-100 m-auto" style={{ maxWidth: '330px' }}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validateLogin}
          onSubmit={(values, { setSubmitting }) => {
            const res = login(values.email, values.password);
            if (res) {
              authenticate(true);
              setUser(res);
              toast.error('Login successful!');
            } else {
              toast.error('Invalid email or password');
            }
          }}
        >
          {({ isValid, errors, handleSubmit, handleChange, handleBlur }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address (*)</Form.Label>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password (*)</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!isValid}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </Container>
  );
};
export default LoginPage;
