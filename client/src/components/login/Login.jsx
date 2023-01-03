// image taken from <a href="https://storyset.com/home">Home illustrations by Storyset</a>
import React from 'react'
import { loginImg } from '../../assets'

const Login = () => {
  return (
    <div>
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
            <div className="image">
                <img src={loginImg} />
            </div>

            <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="test@wpi.edu" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" />
                </div>
            </div>
        </div>

        <div className="footer">
            <button type="button" className="btn">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
