import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import SeeForm from "./pages/SeeForm";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    firstName: "",
    lastName: "",
    gradYear: "",
    username: "",
    isAdmin: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) setAuthState({ ...authState, status: false });
        else {
          setAuthState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            gradYear: response.data.gradYear,
            username: response.data.student,
            isAdmin: response.data.isAdmin,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
    window.location.reload()
  };

  return (
    <>
      <div>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <div className="navbar">
              <h3>{authState.username}</h3>
              {!authState.status ? (
                <>
                  <Link to="/"> Login </Link>
                  <Link to="/registration"> Registration </Link>
                </>
              ) : (
                <>
                  <Link to="/home"> Home </Link>
                  <Link to="/addForm"> Add Form </Link>
                  <button className="btn-top" onClick={logout}>
                    Logout
                  </button>
                </>
              )}
            </div>
            <div className="container">
              <Routes>
                <Route path="/registration" exact element={<Registration />} />
                <Route path="/addForm" exact element={<AddForm />} />
                <Route path="/form/:id" exact element={<SeeForm />} />
                <Route path="/" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
              </Routes>
            </div>
          </Router>
        </AuthContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default App;
