import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PORT from '../config';

const Login = () => {
    const [student, setStudent] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get(`${PORT}/forms`, {
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

    const login = () => {
      if (!student || !password) {
        alert('Please input your username and password. ')
        return
    }
        const data = { student: student, password: password }
        axios.post(`${PORT}/auth/login`, data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
            return;
          }
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            gradYear: response.data.gradYear,
            username: response.data.student,
            isAdmin: response.data.isAdmin,
            id: response.data.id,
            status: true,
          });
          navigate(`/home`);
          window.location.reload();
        })
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        login();
      }
    }
  return (
    <>
    <Form className="p-3 w-50 mx-auto bg-light rounded">
      <h1 className="text-center">LOGIN</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username (WPI Email Address)</Form.Label>
        <Form.Control type="text" placeholder="test@wpi.edu" onChange={(event) => {setStudent(event.target.value);}}/>

        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" onChange={(event) => {setPassword(event.target.value);}} onKeyDown={handleKeyDown}/>
      </Form.Group>

      <div className="d-grid">
      <Button className="btn btn-secondary btn-lg btn-block" onClick={login}>Login</Button>
      </div>

      <div className="d-flex justify-content-center"><p className="mt-3">Not registered? <Link to="/registration">Create an account.</Link></p></div>
    </Form>
    </>
  )
}

export default Login
