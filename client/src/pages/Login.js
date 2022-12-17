import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Login = () => {
    const [student, setStudent] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/forms", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (!response.data.error) {
          navigate(`/home`);
          // alert(response.data.error);
          return;
        }
      });
    }, []);

    const login= () => {
      if (!student || !password) {
        alert('Please input your username and password. ')
        return
    }
        const data = { student: student, password: password }
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
            return;
          }
          localStorage.setItem("accessToken", response.data);
          setAuthState(true);
          navigate(`/home`);
          window.location.reload();
        })
    }
  return (
    <div className="add-form form-control">
        <label>Username (WPI Email Address) </label>
      <input type="text" onChange={(event) => {setStudent(event.target.value);}}/>
      <label>Password </label>
      <input type="password" onChange={(event) => {setPassword(event.target.value);}}/>

      <button className="btn btn-block" onClick={login} >Login</button>
      <p>Not registered? Click <Link to="/registration">here.</Link></p>
    </div>
  )
}

export default Login
