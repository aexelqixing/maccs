import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Header from "../components/Header";
import Student from "../components/Student";
import PORT from "../config";

const SeeUsers = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PORT}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
          alert(response.data.error, response.data);
          console.log(response.data);
          return;
        }
        setListOfUsers(response.data);
        // console.log(response.data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div className="bg-light p-5 rounded">
    {authState.isAdmin ? (
        <Header
          greeting={"ALL CURRENT USERS FOR "}
          user={authState.firstName + " " + authState.lastName}
        />
      ) : (
        <Header user={authState.firstName + " " + authState.lastName} />
      )}
      <table className="table table-hover bg-light">
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
    </div>
    </>
  );
};

export default SeeUsers;
