import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
import Form from "../components/Form";
import Header from "../components/Header";

const Home = () => {
  const [listOfForms, setListOfForms] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/forms", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        navigate(`/`);
        // alert(response.data.error);
        return;
      }
      setListOfForms(response.data);
    });
  }, []);

  return (
    <>
      {authState.isAdmin ? <Header greeting={"ADMIN VIEW FOR"} user={authState.firstName + " " + authState.lastName}/> : <Header user={authState.firstName + " " + authState.lastName}/>}
      {listOfForms.map((value, key) => {
        return <Form key={key} isAdmin={authState.isAdmin} form={value} />;
      })}
    </>
  );
};

export default Home;
