import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Form = ({ form, isAdmin }) => {
  const [changeStatus, setChangeStatus] = useState(false);
  const [formStatus, setFormStatus] = useState(form.status);
  const options = [
    { label: "Requested", value: "requested" },
    { label: "Approved", value: "approved" },
    { label: "Completed", value: "completed" },
    { label: "Not Approved", value: "rejected" },
  ];

  const handleChange = (event) => {
    setFormStatus(event.target.value);
  };

  let navigate = useNavigate();

  const Dropdown = ({ value, options, onChange }) => {
    return (
      <label>
        <select value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  };

  const onSubmitStatusChange = () => {
    const data = { ...form, status: formStatus };
    axios
      .put(`http://localhost:3001/forms/byId/${form.id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/home`);
        window.location.reload();
      });
  };

  return (
    <tr>
      <td>{form.student}</td>
      <td>{form.proposalName}</td>
      <td>
        <span className={`status-all ${form.status}`}>
          {form.status === "rejected" ? "not-approved" : form.status}
        </span>
      </td>
      <td>{form.hours}</td>
      <td>
        {form.createdAt.substring(0, 10)} {form.createdAt.substring(11, 19)}
      </td>
      <td>
        {form.updatedAt.substring(0, 10)} {form.updatedAt.substring(11, 19)}
      </td>
      <td className="actions">
        {changeStatus ? (
          <div>
            <Dropdown
              options={options}
              value={formStatus}
              onChange={handleChange}
            />

            <button
              className="btn btn-edit-status"
              onClick={onSubmitStatusChange}
            >
              Change Status
            </button>
          </div>
        ) : (
          <div>
            {form.status === "approved" && (
              <button className="btn">Edit Hours</button>
            )}{" "}
            {isAdmin && (
              <button
                className="btn btn-edit-status"
                onClick={() => {
                  setChangeStatus(!changeStatus);
                }}
              >
                Edit Status
              </button>
            )}{" "}
            <FaPencilAlt
              style={{ color: "#f48c06", cursor: "pointer" }}
              onClick={() => navigate(`/form/${form.id}`)}
            />
          </div>
        )}
      </td>
    </tr>
    // <div className={`form ${form.isHighNeeds ? "highNeeds" : ""}`}>
    //   <h3>
    //     <div>
    //     <span
    //     className={`status-all ${
    //       form.status
    //     }`}
    //   >
    //     {form.status === "rejected" ? "not approved" : form.status}
    //   </span> {" "}
    //     {form.proposalName}
    //     </div>

    // <div>
    // {(form.status === "approved" || form.status === "completed") && (
    //   <button className="btn">Edit Hours</button>
    // )}{" "}
    // {isAdmin && (
    //   <button
    //     className="btn btn-edit-status"
    //     onClick={() => {
    //       setChangeStatus(!changeStatus);
    //     }}
    //   >
    //     Edit Status
    //   </button>
    // )} {" "}
    // <FaPencilAlt
    //   style={{ color: "#f48c06", cursor: "pointer" }}
    //   onClick={() => navigate(`/form/${form.id}`)}
    // />
    // </div>
    //   </h3>
    //   <p>
    //     <b>Creation Date:</b> {form.createdAt.substring(0, 10)}{" "}
    //     {form.createdAt.substring(11, 19)} | <b>Updated:</b> {form.updatedAt.substring(0, 10)}{" "}
    //     {form.updatedAt.substring(11, 19)}
    //   </p>
    //   {(form.status === "approved" || form.status === "completed") && (
    //     <p>Hours: {form.hours}</p>
    //   )}
    //   <p>
    //     {isAdmin && (
    //       <b>Student: {form.student}</b>
    //     )}
    //   </p>
    //   {changeStatus && (
    // <div>
    //   <Dropdown
    //     options={options}
    //     value={formStatus}
    //     onChange={handleChange}
    //   />

    //   <button
    //     className="btn btn-edit-status"
    //     onClick={onSubmitStatusChange}
    //   >
    //     Change Status
    //   </button>
    // </div>
    //   )}
    // </div>
  );
};

export default Form;
