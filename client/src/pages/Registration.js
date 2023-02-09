import React from "react";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import PORT from "../config";

const Registration = () => {
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PORT}/forms`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          navigate(`/home`);
          alert(response.data.error);
          return;
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    gradYear: "",
    lockerNumber: "",
    student: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(1).required("Required."),
    lastName: Yup.string().min(1).required("Required."),
    gradYear: Yup.string()
      .min(4, "4 digits.")
      .max(4, "4 digits.")
      .required("Required."),
    lockerNumber: Yup.string().min(1).max(2).required("Required."),
    student: Yup.string()
      .email("Enter a valid email address.")
      .min(9)
      .max(32)
      .matches(
        /^[A-Za-z0-9]+@wpi\.edu$/,
        "Your input is a not valid WPI email address."
      )
      .required("You must input your WPI Email Address."),
    password: Yup.string()
      .min(4, "Your password must be at least 4 characters long.")
      .max(20, "Your password must be at most 20 characters long.")
      .required("Put in a password."),
  });

  const onSubmit = (data) => {
    axios.post(`${PORT}/auth`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      console.log(data);
      console.log(response.data);
      navigate(`/`);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form p-3 w-75 mx-auto bg-light rounded">
      <h1 className="text-center">REGISTRATION</h1>
        <Row>
          <Col>
            <label className="form-label">First Name</label>{" "}
            <ErrorMessage
              name="firstName"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              className="form-control"
              id="registerForm-1"
              name="firstName"
              placeholder="Lamitha"
            />
          </Col>
          <Col>
            <label className="form-label">Last Name</label>{" "}
            <ErrorMessage
              name="lastName"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              className="form-control"
              id="registerForm-2"
              name="lastName"
              placeholder="Shilowa"
            />
          </Col>
          <Col md="auto">
            <label className="form-label">Locker Number</label>{" "}
            <ErrorMessage
              name="lockerNumber"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              className="form-control"
              id="registerForm-4"
              name="lockerNumber"
              placeholder="23"
            />
          </Col>
          <Col md="auto">
            <label className="form-label">Graduation Year</label>{" "}
            <ErrorMessage
              name="gradYear"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              className="form-control"
              id="registerForm-3"
              name="gradYear"
              placeholder="2024"
            />
          </Col>
        </Row>

        <div className="mt-2">
          <label className="form-label">Student WPI Address</label>{" "}
          <ErrorMessage
            name="student"
            component="span"
            className="p-1 bg-alert-red text-alert-red rounded m-3"
          />
          <Field
            className="form-control"
            id="registerForm-5"
            name="student"
            placeholder="lshilowa@wpi.edu"
          />
        </div>

        <div className="mt-2">
          <label className="form-label">Password</label>{" "}
          <ErrorMessage
            name="password"
            component="span"
            className="p-1 bg-alert-red text-alert-red rounded m-3"
          />
          <Field
            className="form-control"
            type="password"
            id="registerForm-6"
            name="password"
            placeholder="Your Password"
          />
        </div>

        <div className="d-grid mt-2">
          <Button className="btn btn-secondary btn-lg btn-block" type="submit">
            Register
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <p className="mt-3">
            Already registered? <Link to="/">Login.</Link>
          </p>
        </div>
      </Form>
    </Formik>
  );
};

export default Registration;
