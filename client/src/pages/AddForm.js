import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PORT from "../config";

const AddForm = () => {
  const [physicalAddress, setPhysicalAddress] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PORT}/forms`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
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
    proposalName: Yup.string().required(
      "Please put in the name of your proposal."
    ),
    proposalDescription: Yup.string().required(
      "Please put what you will be doing."
    ),
    businessName: Yup.string().required(
      "Where will you be doing this volunteer service?"
    ),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string().max(2, "This is just the state's abbreviation."),
    zipcode: Yup.string(),
    urlLink: Yup.string(),
  });

  const onSubmit = (data) => {
    axios
      .post(`${PORT}/forms`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate(`/home`);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form p-3 w-75 mx-auto bg-light rounded">
      <h1 className="text-center">ADD COMMUNITY SERVICE FORM</h1>
        <Row>
          <Col>
            <label className="form-label">Proposal Name: </label>
            <ErrorMessage
              name="proposalName"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              id="inputCreateForm"
              name="proposalName"
              placeholder="Doing Your STEM Project"
              className="form-control"
            />
          </Col>
          <Col>
            <label className="form-label">Business Name: </label>
            <ErrorMessage
              name="businessName"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              id="inputCreateForm"
              name="businessName"
              placeholder="Mass Academy of Math and Science"
              className="form-control"
            />
          </Col>
        </Row>
        <label className="form-label mt-2">Proposal Description: </label>
        <ErrorMessage
          name="proposalDescription"
          component="span"
          className="p-1 bg-alert-red text-alert-red rounded m-3"
        />
        <Field
          id="inputCreateForm"
          name="proposalDescription"
          placeholder="Making my STEM poster which is quite obviously high needs. "
          component="textarea"
          rows="4"
          className="form-control"
        />
        <div className="form-check mt-2">
          <label className="form-check-label">Is It Online? </label>
          <ErrorMessage name="isOnline" component="span" />
          <Field
            id="inputCreateForm"
            name="isOnline"
            type="checkbox"
            onClick={() => setPhysicalAddress(!physicalAddress)}
            className="form-check-input"
          />
        </div>
        {physicalAddress ? (
          <>
            <div class="form-group">
              <label className="form-label mt-2">Street Address: </label>
              <Field
                id="inputCreateForm"
                name="streetAddress"
                class="form-control"
                placeholder="85 Prescott Street"
              />
            </div>
            <Row>
              <Col className="col-md-6">
                <label className="form-label mt-2">City: </label>
                <Field
                  id="inputCreateForm"
                  name="city"
                  placeholder="Worcester"
                  class="form-control"
                />
              </Col>
              <Col className="col-md-4">
                <label className="form-label mt-2">State: </label>
                <ErrorMessage
                  name="state"
                  component="span"
                  className="p-1 bg-alert-red text-alert-red rounded m-3"
                />
                <Field
                  id="inputCreateForm"
                  name="state"
                  placeholder="MA"
                  class="form-control"
                />
              </Col>
              <Col className="col-md-2">
                <label className="form-label mt-2">Zipcode: </label>
                <Field
                  id="inputCreateForm"
                  name="zipcode"
                  placeholder="01605"
                  class="form-control"
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <label className="form-label mt-2">URL Link: </label>
            <ErrorMessage
              name="urlLink"
              component="span"
              className="p-1 bg-alert-red text-alert-red rounded m-3"
            />
            <Field
              id="inputCreateForm"
              name="urlLink"
              placeholder="www.yes.com"
              class="form-control"
            />
          </>
        )}
        <div className="form-check mt-2">
          <label className="form-check-label">High Needs? </label>
          <ErrorMessage name="isHighNeeds" component="span" />
          <Field
            id="inputCreateForm"
            name="isHighNeeds"
            type="checkbox"
            className="form-check-input"
          />
        </div>

        <div className="d-grid mt-2">
          <Button className="btn btn-secondary btn-lg btn-block" type="submit">
            Add Form
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddForm;
