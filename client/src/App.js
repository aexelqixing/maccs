import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import AddForm from './pages/AddForm';
import SeeForm from './pages/SeeForm';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {
  return (
    <>
    <div>
      <Router>
        <div className="navbar">
        <Link to="/home"> Home </Link>
        <Link to="/addForm"> Add Form </Link>
        <Link to="/login"> Login </Link>
        <Link to="/"> Registration </Link>
        </div>
        <div className="container">
        <Routes>
          <Route path="/" exact element={<Registration />} />
          <Route path="/addForm" exact element={<AddForm />} />
          <Route path="/form/:id" exact element={<SeeForm />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
        </div>
      </Router>
    </div>
    <Footer />
    </>
  );
}

export default App;
