import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const [physicalAddress, setPhysicalAddress] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/forms", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        navigate(`/`);
        alert(response.data.error);
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    proposalName: "",
    proposalDescription: "",
    businessName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    isOnline: false,
    urlLink: "",
    isHighNeeds: false,
  };

  const validationSchema = Yup.object().shape({
    proposalName: Yup.string().required("Please put in the name of your proposal."),
    proposalDescription: Yup.string().required("Please put what you will be doing."),
    businessName: Yup.string().required("Where will you be doing this volunteer service?"),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string().max(2, "This is just the state's abbreviation."),
    zipcode: Yup.string(),
    urlLink: Yup.string(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/forms", data,
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => {
      navigate(`/home`);
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
          <label>Proposal Description: </label>
          <ErrorMessage
            name="proposalDescription"
            component="span"
            className="errorMessage"
          />
          <Field
            id="inputCreateForm"
            name="proposalDescription"
            placeholder="Making my STEM poster which is quite obviously high needs. "
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
          {physicalAddress ? (
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
          ) : (
            <><label>URL Link: </label>
            <ErrorMessage
              name="urlLink"
              component="span"
              className="errorMessage"
            />
            <Field
              id="inputCreateForm"
              name="urlLink"
              placeholder="www.yes.com"
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
