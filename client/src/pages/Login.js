import React, { useState } from 'react'
import axios from "axios";

const Login = () => {
    const [student, setStudent] = useState("");
    const [password, setPassword] = useState("");

    const login= () => {
      if (!student || !password) {
        alert('Please input your username and password. ')
        return
    }

        const data = { student: student, password: password }
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(response.data)
        })
    }
  return (
    <div className="add-form form-control">
        <label>Username (WPI Email Address) </label>
      <input type="text" onChange={(event) => {setStudent(event.target.value);}}/>
      <label>Password </label>
      <input type="password" onChange={(event) => {setPassword(event.target.value);}}/>

      <button className="btn btn-block" onClick={login} >Login</button>
    </div>
  )
}

export default Login
