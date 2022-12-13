import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Header from "../components/Header";

const Home = () => {
  const [listOfForms, setListOfForms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/forms").then((response) => {
      setListOfForms(response.data);
    });
  }, []);

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
