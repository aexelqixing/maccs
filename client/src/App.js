import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import SeeForm from "./pages/SeeForm";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Test from "./pages/Test";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import SeeUsers from "./pages/SeeUsers";
import PORT from "./config";

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
      .get(`${PORT}/auth/auth`, {
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
      <div className="bg-dark d-flex flex-column min-vh-100">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <Navbar className="bg-mams-red">
              <Container>
                <Navbar.Brand className="text-white" href="/"><p className="display-6 m-0">MACCS</p></Navbar.Brand>
                <Navbar.Collapse>
                  <Nav className="me-auto">
                  {!authState.status ? (
                <>
                  <Nav.Link className="text-light" href="/"> Login </Nav.Link>
                  <Nav.Link className="text-light" href="/registration"> Registration </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="text-light" href="/home"> Home </Nav.Link>
                  <Nav.Link className="text-light" href="/addForm"> Add Form </Nav.Link>
                  {authState.isAdmin && <><Nav.Link className="text-light" href="/seeUsers">Users</Nav.Link><Nav.Link className="text-light" href="/testingPurposes">Testing</Nav.Link></>}
                </>
              )}
                  </Nav>
                </Navbar.Collapse>

                <Navbar.Text className="justify-content-end">
                  <Navbar.Text className="text-white m-3">
                    {authState.username}
                  </Navbar.Text>
                  {authState.status && 
                  <Button variant="danger ml-5" onClick={logout}>Logout</Button>}
                </Navbar.Text>
              </Container>
            </Navbar>

            <div className="my-auto p-5">
              <Routes>
                <Route path="/registration" exact element={<Registration />} />
                <Route path="/addForm" exact element={<AddForm />} />
                <Route path="/form/:id" exact element={<SeeForm />} />
                <Route path="/" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/profile/:id" exact element={<ProfilePage />}/>
                <Route path="/seeUsers" exact element={<SeeUsers />}/>
                <Route path="/testingPurposes" exact element={<Test />}/>
                <Route path="*" exact element={<PageNotFound />}/>
              </Routes>
            </div>
          </Router>
        </AuthContext.Provider>

        <Footer />
      </div>
    </>
  );
}

export default App;
