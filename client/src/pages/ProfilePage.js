import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Form from "../components/Form";
import PORT from "../config";

const ProfilePage = () => {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [listOfForms, setListOfForms] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${PORT}/auth/basicInfo/${id}`).then((response) => {
      if (!response.data || response.data.error) {
        navigate(`/`);
        // alert(response.data.error);
        return;
      }
        setUser(response.data);
    });

    axios
      .get(`${PORT}/forms/byUserId/${id}`, {
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
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-light p-4 w-75 mx-auto rounded">
        <h3>{user.firstName + " " + user.lastName}</h3>
        <p>
          <b>Graduation Year:</b> {user.gradYear}
        </p>
        <p><b>Not Verified Hours:</b> {user.nonApprovedHours} | <b>Verified Hours:</b> {user.verifiedHours}</p>
      </div>
      {authState.isAdmin && <div className="bg-light p-3 rounded mt-4"><table className="table table-hover bg-light">
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
      </table></div>}
    </>
  );
};

export default ProfilePage;
