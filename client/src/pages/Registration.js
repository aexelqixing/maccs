import React from 'react'
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";
import PORT from '../config';

const Registration = () => {
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${PORT}/forms`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
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
        password: ""
      };
    
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(1).required("Your first name is required."),
        lastName: Yup.string().min(1).required("Your last name is required."),
        gradYear: Yup.string().min(4).max(4).required(),
        lockerNumber: Yup.string().min(2, "If it is a one-digit number, put a '0' in front of it.").max(2).required("Your locker number is required."),
        student: Yup.string()
          .email("Enter a valid email address.")
          .min(9)
          .max(32)
          .matches(/^[A-Za-z0-9]+@wpi\.edu$/, "It is not a WPI email (yet).")
          .required("You must input your WPI Email Address."),
        password: Yup.string().min(4).max(20).required(),
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
        })
      }

  return (
    <div className="add-form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-control">
        <label>First Name: </label>
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
          <label>Last Name: </label>
          <ErrorMessage
            name="lastName"
            component="span"
            className="errorMessage"
          />
          <Field
            id="registerForm-2"
            name="lastName"
            placeholder="Shilowa"
          />
          <label>Graduation Year: </label>
          <ErrorMessage
            name="gradYear"
            component="span"
            className="errorMessage"
          />
          <Field
            id="registerForm-3"
            name="gradYear"
            placeholder="2024"
          />
          <label>Locker Number: </label>
          <ErrorMessage
            name="lockerNumber"
            component="span"
            className="errorMessage"
          />
          <Field
            id="registerForm-4"
            name="lockerNumber"
            placeholder="23"
          />
          <label>Student WPI Address: </label>
          <ErrorMessage
            name="student"
            component="span"
            className="errorMessage"
          />
          <Field
            id="registerForm-5"
            name="student"
            placeholder="lshilowa@wpi.edu"
          />
          <label>Password: </label>
          <ErrorMessage
            name="password"
            component="span"
            className="errorMessage"
          />
          <Field
            type="password"
            id="registerForm-6"
            name="password"
            placeholder="Your Password"
          />
          <button className="btn btn-block" type="submit">
            {" "}
            Register {" "}
          </button>
        </Form>
      </Formik>
      <p>Already registered? Login <Link to="/">here.</Link></p>
    </div>
  )
}

export default Registration
