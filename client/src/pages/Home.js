import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Form from "../components/Form";
import Header from "../components/Header";
import PORT from "../config";

const Home = () => {
  const [listOfForms, setListOfForms] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const data = [];

  useEffect(() => {
    axios
      .get(`${PORT}/forms`, {
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
        console.log(localStorage.getItem("accessToken"))
        setListOfForms(response.data);
        console.log(listOfForms);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-light p-5 rounded">
        {authState.isAdmin ? (
          <Header
            greeting={"ADMIN VIEW FOR"}
            user={authState.firstName + " " + authState.lastName}
          />
        ) : (
          <Header user={authState.firstName + " " + authState.lastName} />
        )}
        <table className="table table-hover bg-light">
          <thead>
            <tr>
              <th>Student Email</th>
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
              {console.log(form.verifiedHours, form.nonApprovedHours)}
              {data.concat({ name: form.student, verifiedHours: form.verifiedHours })}
              return <Form key={key} isAdmin={authState.isAdmin} form={form} mode="table"/>;
            })}
            {console.log(data)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
