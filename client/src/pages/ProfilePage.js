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
  const [completedHours, setCompletedHours] = useState(0);
  const [notVerifiedHours, setNotVerifiedHours] = useState(0);
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

  return (
    <>
      <div className="form">
        <h3>{user.firstName + " " + user.lastName}</h3>
        <p>
          <b>Graduation Year:</b> {user.gradYear}
        </p>
        <p><b>Verified Hours:</b> {user.verifiedHours} | <b>Not Verified Hours:</b> {user.nonApprovedHours}</p>
      </div>
      <table>
        <thead>
          <tr>
          <th>Student WPI Address</th>
          <th>Proposal Name</th>
          <th>Status</th>
          <th>Approved?</th>
          <th>Verified?</th>
          <th>Unconfirmed Hours</th>
          <th>Verified Hours</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Image?</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {listOfForms.map((form, key) => {
          return <Form key={key} isAdmin={authState.isAdmin} form={form} />;
        })}
        </tbody>
      </table>
    </>
  );
};

export default ProfilePage;
