import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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

  const [changeAddHours, setChangeAddHours] = useState(false);
  const [addFormHours, setAddFormHours] = useState(0);

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

  const addHours = () => {
    const data = { ...form, hours: parseFloat(form.hours) + parseFloat(addFormHours) }
    axios.put(`http://localhost:3001/forms/byId/${form.id}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      console.log(response.data);
        navigate(`/home`);
        window.location.reload();
    })
  }

  const deleteForm = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this form? It will be deleted permanently."
      )
    ) {
      axios
        .delete(`http://localhost:3001/forms/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <tr>
      <td><Link to={`/profile/${form.UserId}`}>{form.student}</Link></td>
      <td>{form.proposalName}</td>
      <td>
        <span className={`status-all ${form.status}`}>
          {form.status === "rejected" ? "not-approved" : form.status}
        </span>
      </td>
      <td>
        {changeAddHours ? (
          <div className="add-form form-control">
            <input type="number" onChange={(event) => {setAddFormHours(event.target.value)}}/>
            <button className="btn btn-block" onClick={addHours}>Add Hours</button>
          </div>
        ) : (
          form.hours
        )}
      </td>
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
              <button
                className="btn"
                onClick={() => {
                  setChangeAddHours(!changeAddHours);
                }}
              >
                Edit Hours
              </button>
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
            />{" "}
            <FaTrashAlt
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                deleteForm(form.id);
              }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default Form;
