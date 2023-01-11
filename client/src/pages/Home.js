import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Form from "../components/Form";
import Header from "../components/Header";

const Home = () => {
  const [listOfForms, setListOfForms] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/forms", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          navigate(`/`);
          // alert(response.data.error);
          return;
        }
        setListOfForms(response.data);
        console.log(listOfForms);
      });
  }, []);

  return (
    <>
      {authState.isAdmin ? (
        <Header
          greeting={"ADMIN VIEW FOR"}
          user={authState.firstName + " " + authState.lastName}
        />
      ) : (
        <Header user={authState.firstName + " " + authState.lastName} />
      )}
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

export default Home;
