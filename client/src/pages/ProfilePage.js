import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Form from "../components/Form";

const ProfilePage = () => {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [listOfForms, setListOfForms] = useState([]);
  const [hours, setHours] = useState(0);
  const [updateHoursOnce, setUpdateOnce] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
      setUser(response.data);
    });

    axios
      .get(`http://localhost:3001/forms/byUserId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfForms(response.data);
      });
  }, []);

  const updateHours = () => {
    listOfForms.map((form) => {
        if (form.status === "completed") {
          setHours(hours + form.hours);
        }
      });
      setUpdateOnce(false);
  }

  return (
    <>
      <div className="form">
        <h3>{user.firstName + " " + user.lastName}</h3>
        <p>
          <b>Graduation Year:</b> {user.gradYear}
        </p>
        <p>Hours: {hours}</p>
        {updateHoursOnce && <button
          className="btn"
          onClick={updateHours}
        >
          Update Hours
        </button>}
      </div>
      <table>
        <thead>
          <th>Student WPI Address</th>
          <th>Proposal Name</th>
          <th>Status</th>
          <th>Hours</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Actions</th>
        </thead>
        {listOfForms.map((form, key) => {
          return <Form key={key} isAdmin={authState.isAdmin} form={form} />;
        })}
      </table>
    </>
  );
};

export default ProfilePage;
