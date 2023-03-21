import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { FaTimes } from "react-icons/fa";
import PORT from "../config";
import { Button, Col, Row } from "react-bootstrap";

const SeeForm = () => {
  let { id } = useParams();
  const [form, setFormObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [student, setStudent] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [physicalAddress, setPhysicalAddress] = useState(true);
  const { authState } = useContext(AuthContext);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("");
  const [getImageURL, setGetImageURL] = useState("");
  const [closeImage, setCloseImage] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PORT}/forms/byId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
          // alert(response.data.error);
          return;
        }
        setFormObject(response.data);
        setStudent(response.data.student);
        setPhysicalAddress(!response.data.isOnline);
        setGetImageURL(response.data.image);
        if (!getImageURL) setCloseImage(true);
      });

    axios.get(`${PORT}/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    urlLink: form.urlLink,
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
      .put(`${PORT}/forms/byId/${id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        window.location.reload();
      });
  };

  const deleteComment = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this comment? It will be deleted permanently."
      )
    ) {
      axios
        .delete(`${PORT}/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id !== id;
            })
          );
        });
    }
  };

  const addComment = () => {
    if (!newComment) {
      alert("Please add all the required information.");
      return;
    }

    axios
      .post(
        `${PORT}/comments`,
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
        window.location.reload();
      });
  };

  const imageHandler = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("filename", imageName);

    axios.put(`${PORT}/forms/upload/${id}`, formData).then((response) => {
      // console.log(response.data);
      window.location.reload();
    });
  };

  const getImage = () => {
    axios
      .get(`${PORT}/forms/upload/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setGetImageURL(response.data);
        console.log(getImageURL);
      });
    setCloseImage(!closeImage);
  };

  return (
    <>
      <div className="bg-light p-4 w-75 mx-auto rounded">
        <h1 className="m-0 p-0">{form.proposalName} <span className={`p-1 rounded text-center ${form.status}`}>
        {form.status === "rejected" ? "not approved" : form.status}
        </span></h1>
        <div className="bg-isabelline p-4 mt-3 rounded">
          <table className="table table-borderless w-auto mb-0">
            <tbody>
              <tr>
                <th scope="row" className="text-end">
                  Student Email
                </th>
                <td>{form.student}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Created Date
                </th>
                <td>
                  {form.createdAt ? form.createdAt.substring(0, 10) : "..."}{" "}
                  {form.createdAt ? form.createdAt.substring(11, 19) : ""}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Updated Date
                </th>
                <td>
                  {form.updatedAt ? form.updatedAt.substring(0, 10) : "..."}{" "}
                  {form.updatedAt ? form.updatedAt.substring(11, 19) : ""}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Description
                </th>
                <td>{form.proposalDescription}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Business Name
                </th>
                <td>{form.businessName}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Location
                </th>
                <td>{form.isOnline
              ? form.urlLink
              : form.streetAddress +
                ", " +
                form.city +
                ", " +
                form.state +
                " " +
                form.zipcode}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  High Needs
                </th>
                <td>{form.isHighNeeds ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Unconfirmed Hours
                </th>
                <td>{form.nonApprovedHours}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end">
                  Verified Hours
                </th>
                <td>{form.verifiedHours}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {form.status !== "completed" && <Button
          variant="warning mt-3 mr-3 mb-3"
          onClick={() => {
            setEditForm(!editForm);
          }}
        >
          {" "}
          {editForm ? "Close Editing" : "Edit Form"}{" "}
        </Button>}
        {editForm && (
          <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="form p-3 w-75 mx-auto bg-light rounded">
          <h1 className="text-center">EDIT COMMUNITY SERVICE FORM</h1>
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
                Finish Editing
              </Button>
            </div>
          </Form>
        </Formik>
        )}
        {getImageURL && <Button variant={(editForm || form.status === "completed") ? "warning mt-3 mb-3" : "warning m-3"} onClick={getImage}>
          {closeImage ? "Close Image" : "Get Image"}
        </Button>}
        {getImageURL && closeImage && (
          <img
            className="img-fluid"
            src={require("../assets/images/" + getImageURL)}
            alt="img"
          />
        )}
        {form.status === "approved" && <><div className="mb-3 mt-3">
            <label className="form-label">{getImageURL ? "If the image you uploaded is NOT the correct one, please upload the correct image here. " : "If you have completed your community service, please choose a file to upload for verification."}</label>
            <input
            className="form-control"
          type="file"
          name="image"
          accept="image/*"
          multiple={false}
          onChange={(e) => {
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name);
          }}
        />
        </div>
        <Button variant="danger" onClick={imageHandler}>
          Submit
        </Button></>}
      </div>


      <div className="bg-light p-4 w-75 mt-3 mx-auto rounded">
        <h3>Comments</h3>
        <div className="bg-isabelline mt-3 mb-3 rounded">
          {comments.map((comment, key) => {
            return (
              <div key={key} className={`${comment.isAdmin ? "bg-grey" : ""} p-3 m-0 rounded`}>
                <h3>
                  {comment.commentBody}{" "}
                  {authState.username === comment.username && (
                    <FaTimes
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    />
                  )}
                </h3>
                <p>
                  <span className="bg-black p-2 rounded text-white">{comment.username}</span>{" "}
                  Sent on{" "}
                  {comment.createdAt
                    ? comment.createdAt.substring(0, 10)
                    : "..."}{" "}
                  {comment.createdAt ? comment.createdAt.substring(11, 19) : ""}
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <textarea
            className="form-control"
            rows="3"
            type="text"
            value={newComment}
            placeholder="Comment..."
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <Button variant="secondary mb-2 mr-2 mt-2" onClick={addComment}>
            Add Comment
          </Button>
        </div>
      </div>
    </>
  );
};

export default SeeForm;
