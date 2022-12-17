import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Form = ({ form, isAdmin }) => {
  const [changeStatus, setChangeStatus] = useState(false);
  const [ formStatus, setFormStatus ] = useState(form.status);
  let navigate = useNavigate();

  return (
    <div className={`form ${form.isHighNeeds ? "highNeeds" : ""}`}>
      <h3>
        {form.proposalName}{" "}
        <FaPencilAlt
          style={{ color: "#f48c06", cursor: "pointer" }}
          onClick={() => navigate(`/form/${form.id}`)}
        />
      </h3>
      <span
        className={`status-all ${
          form.status === "not approved" ? "rejected" : form.status
        }`}
      >
        {form.status}
      </span>
      <p>
        Start Date: {form.createdAt.substring(0, 10)}{" "}
        {form.createdAt.substring(11, 19)}
      </p>
      <p>
        Updated: {form.updatedAt.substring(0, 10)}{" "}
        {form.updatedAt.substring(11, 19)}
      </p>
      {(form.status === "approved" || form.status === "completed") && (
        <p>Hours: {form.hours}</p>
      )}
      <p>
        {(form.status === "approved" || form.status === "completed") && (<button className="btn">Edit Hours</button>)}{" "}
        {isAdmin && (
          <button
            className="btn btn-edit-status"
            onClick={() => {
              setChangeStatus(!changeStatus);
            }}
          >
            Edit Status
          </button>
        )}
      </p>
      <p>
        {isAdmin && (
          <span className="form form-creator">Student: {form.student}</span>
        )}
      </p>
      {changeStatus && <div className="radio">
        <input type='radio' name='status' value='requested' checked={form.status === "requested"} /> <label>Requested</label>
        <input type='radio' name='status' value='requested' checked={form.status === "requested"} /> <label>Requested</label>
        <input type='radio' name='status' value='requested' checked={form.status === "requested"} /> <label>Requested</label> </div>}
    </div>
  );
};

export default Form;
