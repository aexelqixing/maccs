import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const [physicalAddress, setPhysicalAddress] = useState(true);
  let navigate = useNavigate();

  const initialValues = {
    student: "",
    proposalName: "",
    businessName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    isOnline: false,
    isHighNeeds: false,
  };

  const validationSchema = Yup.object().shape({
    student: Yup.string()
      .email("Enter a valid email address.")
      .min(9)
      .max(32)
      .matches(/^[A-Za-z0-9]+@wpi\.edu$/, "It is not a WPI email (yet).")
      .required("You must input your WPI Email Address."),
    proposalName: Yup.string().required(),
    businessName: Yup.string().required(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string().max(2, "This is just the state's abbreviation."),
    zipcode: Yup.string(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/forms", data).then((response) => {
      navigate(`/`);
    });
  };

  return (
    <div className="add-form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-control">
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
          <label>Proposal Name: </label>
          <ErrorMessage
            name="proposalName"
            component="span"
            className="errorMessage"
          />
          <Field
            id="inputCreateForm"
            name="proposalName"
            placeholder="Doing Your STEM Project"
          />
          <label>Business Name: </label>
          <ErrorMessage
            name="businessName"
            component="span"
            className="errorMessage"
          />
          <Field
            id="inputCreateForm"
            name="businessName"
            placeholder="Mass Academy of Math and Science"
          />
          <div className="form-control-check">
            <label>Is It Online? </label>
            <ErrorMessage name="isOnline" component="span" />
            <Field
              id="inputCreateForm"
              name="isOnline"
              type="checkbox"
              onClick={() => setPhysicalAddress(!physicalAddress)}
            />
          </div>
          {physicalAddress && (
            <>
                <label>Street Address: </label>
                <Field
                  id="inputCreateForm"
                  name="streetAddress"
                  placeholder="85 Prescott Street"
                />
                <label>City: </label>
                <Field
                  id="inputCreateForm"
                  name="city"
                  placeholder="Worcester"
                />
                <label>State: </label>
                <ErrorMessage
                  name="state"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  id="inputCreateForm"
                  name="state"
                  placeholder="MA"
                />
                <label>Zipcode: </label>
                <Field
                  id="inputCreateForm"
                  name="zipcode"
                  placeholder="01605"
                />
            </>
          )}
          <div className="form-control-check">
            <label>High Needs? </label>
            <ErrorMessage name="isHighNeeds" component="span" />
            <Field id="inputCreateForm" name="isHighNeeds" type="checkbox" />
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
