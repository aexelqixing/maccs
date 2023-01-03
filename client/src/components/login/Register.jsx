import { Formik, Form, ErrorMessage, Field } from "formik";
import React from "react";
import { registerImg } from "../../assets";

const Register = () => {
  return (
    <div>
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={registerImg} />
          </div>

          <Formik>
            <Form className="form">
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  id="registerForm-1"
                  name="firstName"
                  placeholder="Lamitha"
                />
              </div>

              <div className="form-group">
                <label>Student WPI Address </label>
                <ErrorMessage
                  name="student"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  id="registerForm-4"
                  name="student"
                  placeholder="lshilowa@wpi.edu"
                />
              </div>

              <div className="form-group">
                <label>Password: </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  type="password"
                  id="registerForm-5"
                  name="password"
                  placeholder="Your Password"
                />
              </div>
            </Form>
          </Formik>
        </div>

        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
