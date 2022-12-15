import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Header from "../components/Header";

const Home = () => {
  const [listOfForms, setListOfForms] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/forms", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        navigate(`/`);
        alert(response.data.error);
        return;
      }
      setListOfForms(response.data);
    });
  }, [navigate]);

  return (
    <>
      <Header />
      {listOfForms.map((value, key) => {
        return <Form key={key} form={value} />;
      })}
    </>
  );
};

export default Home;
