import React from "react";
import { FaPencilAlt, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PORT from "../config";

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
        <select className="form-select mb-1" value={value} onChange={onChange}>
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
      .put(`${PORT}/forms/byId/${form.id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
  };

  const addHours = () => {
    const data = { ...form, nonApprovedHours: parseFloat(form.nonApprovedHours) + parseFloat(addFormHours) }
    axios.put(`${PORT}/forms/byId/${form.id}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      console.log(response.data);
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
        .delete(`${PORT}/forms/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <tr>
      <td>{isAdmin ? <Link to={`/profile/${form.UserId}`}>{form.student}</Link> : form.student}</td>
      <td>{form.proposalName}</td>
      <td>
        <div className={`p-1 rounded text-center ${form.status}`}>
        {form.status === "rejected" ? "not approved" : form.status}
        </div>
      </td>
      <td className="text-center">{form.wasApproved ? <FaCheck /> : <FaTimes />}</td>
      <td className="text-center">{form.wasVerified ? <FaCheck /> : <FaTimes />}</td>
      <td>
        {changeAddHours ? (
          <div className="add-form form-control">
            <input type="number" className="form-control" onChange={(event) => {setAddFormHours(event.target.value)}}/>
            <Button variant="secondary mt-2 mr-2" onClick={addHours}>Add Hours</Button>
          </div>
        ) : (
          form.nonApprovedHours
        )}
      </td>
      <td>{form.verifiedHours}</td>
      <td>
        {form.createdAt.substring(0, 10)} {form.createdAt.substring(11, 19)}
      </td>
      <td>
        {form.updatedAt.substring(0, 10)} {form.updatedAt.substring(11, 19)}
      </td>
      <td>{form.image ? "Click pencil to see image." : <FaTimes />}</td>
      <td className="text-left">
        {changeStatus ? (
          <div>
            <Dropdown
              options={options}
              value={formStatus}
              onChange={handleChange}
            />

            <Button
              variant="secondary mb-2 mr-2"
              onClick={onSubmitStatusChange}
            >
              Change Status
            </Button>
          </div>
        ) : (
          <div>
            {form.status === "approved" && (
              <Button
                variant="danger mb-2 mr-2"
                onClick={() => {
                  setChangeAddHours(!changeAddHours);
                }}
              >
                Edit Hours
              </Button>
            )}{" "}
            {isAdmin && (
              <Button
                variant="warning mb-2 mr-2"
                onClick={() => {
                  setChangeStatus(!changeStatus);
                }}
              >
                Edit Status
              </Button>
            )}{" "} <br/>
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
