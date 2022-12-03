import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddForm = () => {
  let navigate = useNavigate()

  const initialValues = {
    student: "",
    proposalName: "",
    businessName: "",
    isOnline: false,
    isHighNeeds: false
  };

  const validationSchema = Yup.object().shape({
    student: Yup.string().email("Enter a valid email address.").min(9).max(32).required("You must input your WPI Email Address."),
    proposalName: Yup.string().required(),
    businessName: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/forms", data).then((response) => {
      navigate(`/`);
    });
  };

  return (
    <div className="add-form">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="form-control">
          <label>Student WPI Address: </label>
          <ErrorMessage name="student" component="span" className="errorMessage"/>
          <Field
            id="inputCreateForm"
            name="student"
            placeholder="lshilowa@wpi.edu"
          />
          <label>Proposal Name: </label>
          <ErrorMessage name="proposalName" component="span" className="errorMessage"/>
          <Field
            id="inputCreateForm"
            name="proposalName"
            placeholder="Doing Your STEM Project"
          />
          <label>Business Name: </label>
          <ErrorMessage name="businessName" component="span" className="errorMessage"/>
          <Field
            id="inputCreateForm"
            name="businessName"
            placeholder="Mass Academy of Math and Science"
          />
          <div className="form-control-check">
            <label>Is It Online? </label>
            <ErrorMessage name="isOnline" component="span" />
            <Field id="inputCreateForm"
            name="isOnline" type="checkbox" />
          </div>
          <div className="form-control-check">
            <label>High Needs? </label>
            <ErrorMessage name="isHighNeeds" component="span" />
            <Field id="inputCreateForm"
            name="isHighNeeds" type="checkbox" />
          </div>
          <button className="btn btn-block" type="submit">
            {" "}
            Add Form{" "}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
