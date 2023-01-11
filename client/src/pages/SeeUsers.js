import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Header from "../components/Header";
import Student from "../components/Student";

const SeeUsers = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
          alert(response.data.error);
          return;
        }
        setListOfUsers(response.data);
      });
  }, []);

  return (
    <>
      {authState.isAdmin ? (
        <Header
          greeting={"ALL CURRENT USERS FOR "}
          user={authState.firstName + " " + authState.lastName}
        />
      ) : (
        <Header user={authState.firstName + " " + authState.lastName} />
      )}
      <table>
        <thead>
          <tr>
          <th>Student WPI Address</th>
          <th>Student Name</th>
          <th>Graduation Year</th>
          <th>Verified Hours</th>
          <th>Unverified Hours</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {listOfUsers.map((user, key) => {
          return <Student key={key} user={user} />
        })}
        </tbody>
      </table>
    </>
  );
};

export default SeeUsers;
