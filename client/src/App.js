import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home, AddForm, SeeForm, Registration, Login, ProfilePage, Test, PageNotFound, SeeUsers } from "./pages";
import Footer from "./components/Footer";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PORT from "./config";
import { FaRegIdBadge } from "react-icons/fa";

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
    window.location.reload();
  };

  return (
    <>
      <div className="bg-grey d-flex flex-column min-vh-100">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <Navbar className="bg-mams-red">
              <Container>
                <Navbar.Brand className="text-white my-auto" href="/">
                  <p className="display-6 m-0">MACCS</p>
                </Navbar.Brand>
                <Navbar.Collapse>
                  <Nav className="me-auto">
                    {!authState.status ? (
                      <>
                        <Nav.Link className="text-light my-auto" href="/">
                          {" "}
                          Login{" "}
                        </Nav.Link>
                        <Nav.Link
                          className="text-light my-auto"
                          href="/registration"
                        >
                          {" "}
                          Registration{" "}
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link className="text-light my-auto" href="/home">
                          {" "}
                          Home{" "}
                        </Nav.Link>
                        <Nav.Link
                          className="text-light my-auto"
                          href="/addForm"
                        >
                          {" "}
                          Add Form{" "}
                        </Nav.Link>
                        {authState.isAdmin && (
                          <>
                            <Nav.Link
                              className="text-light my-auto"
                              href="/seeUsers"
                            >
                              Users
                            </Nav.Link>
                            <Nav.Link
                              className="text-light my-auto"
                              href="/testingPurposes"
                            >
                              Testing
                            </Nav.Link>
                          </>
                        )}
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>

                <Navbar.Text className="justify-content-end">
                  {authState.status && (<Navbar.Text className="text-white m-3 my-auto">
                    <Link to={`/profile/${authState.id}`}>
                      <button className="btn-mams-red ml-5 p-2 my-auto mx-auto rounded">
                        <FaRegIdBadge size="28" /> {authState.username}
                      </button>
                    </Link>
                  </Navbar.Text>)}
                  {authState.status && (
                    <Button
                      variant="danger ml-5 my-auto mx-auto"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  )}
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
                <Route path="/profile/:id" exact element={<ProfilePage />} />
                <Route path="/seeUsers" exact element={<SeeUsers />} />
                <Route path="/testingPurposes" exact element={<Test />} />
                <Route path="*" exact element={<PageNotFound />} />
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
