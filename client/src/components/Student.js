import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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

  const updateHours = () => {
    listOfForms.map((form) => {
      if (form.status === "completed") {
        setCompletedHours(completedHours + form.hours);
      }
      if (form.status === "approved") {
        setNotVerifiedHours(notVerifiedHours + form.hours);
      }
    });
    setUpdateOnce(false);
  };

  return (
    <tbody>
      <td>{user.student}</td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.gradYear}</td>
      <td>{completedHours}</td>
      <td>{notVerifiedHours}</td>
      <td>
        {updateHoursOnce && (
          <button className="btn" onClick={updateHours}>
            Update Hours
          </button>
        )}
      </td>
    </tbody>
  );
};

export default Student;
