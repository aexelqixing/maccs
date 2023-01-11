import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = ({ user }) => {
  const [listOfForms, setListOfForms] = useState([]);
  const [completedHours, setCompletedHours] = useState(0);
  const [notVerifiedHours, setNotVerifiedHours] = useState(0);
  const [updateHoursOnce, setUpdateOnce] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/forms/byUserId/${user.id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfForms(response.data);
      });
  }, []);

  return (
    <tr>
      <td><Link to={`/profile/${user.id}`}>{user.student}</Link></td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.gradYear}</td>
      <td>{user.verifiedHours}</td>
      <td>{user.nonApprovedHours}</td>
      <td>
      </td>
    </tr>
  );
};

export default Student;
