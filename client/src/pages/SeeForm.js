import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Comment from "../components/Comment";
import axios from "axios";

const SeeForm = () => {
  let { id } = useParams();
  const [form, setFormObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [student, setStudent] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [physicalAddress, setPhysicalAddress] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/forms/byId/${id}`).then((response) => {
      setFormObject(response.data);
      setStudent(response.data.student);
      setPhysicalAddress(!response.data.isOnline);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const initialValues = {
    student: form.student,
    proposalName: form.proposalName,
    proposalDescription: form.proposalDescription,
    businessName: form.businessName,
    streetAddress: form.streetAddress,
    city: form.city,
    state: form.state,
    zipcode: form.zipcode,
    isOnline: form.isOnline,
    isHighNeeds: form.isHighNeeds,
  };

  const validationSchema = Yup.object().shape({
    student: Yup.string()
      .email("Enter a valid email address.")
      .min(9)
      .max(32)
      .matches(/^[A-Za-z0-9]+@wpi\.edu$/, "It is not a WPI email (yet).")
      .required("You must input your WPI Email Address."),
    proposalName: Yup.string().required(),
    proposalDescription: Yup.string().required(),
    businessName: Yup.string().required(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string().max(2, "This is just the state's abbreviation."),
    zipcode: Yup.string(),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3001/forms/byId/${id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/home`);
      });
  };

  const addComment = () => {
    if (!newComment) {
      alert("Please add all the required information.");
      return;
    }

    axios
      .post(
        "http://localhost:3001/comments",
        {
          user: student,
          commentBody: newComment,
          FormId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          return;
        }
        console.log(response);
        const commentToAdd = response.data;
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <>
      <div className={`form ${form.isHighNeeds ? "highNeeds" : ""}`}>
        <h3>{form.proposalName} </h3>
        <p>
          Start Date: {form.createdAt ? form.createdAt.substring(0, 10) : "..."}{" "}
          {form.createdAt ? form.createdAt.substring(11, 19) : ""}
        </p>
        <p>
          Updated On {form.updatedAt ? form.updatedAt.substring(0, 10) : "..."}{" "}
          {form.updatedAt ? form.createdAt.substring(11, 19) : ""}
        </p>
        <p>
          <span className="form form-creator">Student: {form.student}</span>
        </p>
        <div className="description">
          <h3>Description: {form.proposalDescription} </h3>
          <h3>Business Name: {form.businessName}</h3>
          <h3>High Needs: {form.highNeeds ? "Yes" : "No"}</h3>
          <h3>Hours: {form.hours}</h3>
          <button
            className="btn"
            onClick={() => {
              setEditForm(!editForm);
            }}
          >
            {" "}
            {editForm ? "Close Editing" : "Edit Form"}{" "}
          </button>
        </div>
        {editForm && (
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
                    <Field id="inputCreateForm" name="state" placeholder="MA" />
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
                  <Field
                    id="inputCreateForm"
                    name="isHighNeeds"
                    type="checkbox"
                  />
                </div>
                <button className="btn btn-block" type="submit">
                  {" "}
                  Submit Form{" "}
                </button>
              </Form>
            </Formik>
          </div>
        )}
      </div>
      <div className="form comment-container">
        <h3>Comments</h3>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <Comment key={key} comment={comment} />;
          })}
        </div>
        <div className="add-form form-control">
          <input
            type="text"
            value={newComment}
            placeholder="Comment..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button className="btn" onClick={addComment}>
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default SeeForm;
