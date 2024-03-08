import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import '../Components/Style.css';


///// CHANGE PASSWORD   ////////

const ChangePassword = () => {
  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/changepassword', values);
      setStatus(response.data.msg);
    } catch (error) {
      console.log('Error:', error);
      setStatus('Error changing password. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <div className="form-group">
      <h1 style={{ color: "red" }}>Change Password</h1>

      <br />

      <Formik
        initialValues={{ email: '', password: '', newPassword: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Email is required';
          }
          if (!values.password) {
            errors.password = 'Current password is required';
          }
          if (!values.newPassword) {
            errors.newPassword = 'New password is required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
          } else if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = 'New password and confirm password do not match';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Current Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="newPassword">New Password</label>
              <Field type="password" name="newPassword" />
              <ErrorMessage name="newPassword" component="div" />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <br />
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {status && <div>{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
