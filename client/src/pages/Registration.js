import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        gradYear: "",
        student: "",
        password: ""
      };
    
      const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(1).required("Your first name is required."),
        lastName: Yup.string().min(1).required("Your last name is required."),
        gradYear: Yup.string().min(4).max(4).required(),
        student: Yup.string()
          .email("Enter a valid email address.")
          .min(9)
          .max(32)
          .matches(/^[A-Za-z0-9]+@wpi\.edu$/, "It is not a WPI email (yet).")
          .required("You must input your WPI Email Address."),
        password: Yup.string().min(4).max(20).required(),
      });

      const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
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
            id="inputCreateForm"
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
            id="inputCreateForm"
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
            id="inputCreateForm"
            name="gradYear"
            placeholder="2024"
          />
          <label>Student WPI Address: </label>
          <ErrorMessage
            name="student"
            component="span"
            className="errorMessage"
          />
          <Field
            id="inputCreateForm"
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
            id="inputCreateForm"
            name="password"
            placeholder="Your Password"
          />
          <button className="btn btn-block" type="submit">
            {" "}
            Register {" "}
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
