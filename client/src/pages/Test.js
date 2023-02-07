import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import Header from "../components/Header";
import PORT from "../config";

const Test = () => {
  const [listOfForms, setListOfForms] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const columns = [
    { label: "Student WPI Address", accessor: "student", sortable: false },
    { label: "Proposal Name", accessor: "proposalName", sortable: false },
    { label: "Unconfirmed Hours", accessor: "nonApprovedHours", sortable: true },
    { label: "Verified Hours", accessor: "verifiedHours", sortable: true },
    { label: "Updated Date", accessor: "updatedAt", sortable: true, sortbyOrder: "desc" },
  ];

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
        setListOfForms(response.data);
        console.log(listOfForms);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Test;
