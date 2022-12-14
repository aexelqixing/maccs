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
    <div className="container">
      <Router>
        <div className="navbar">
        <Link to="/"> Home </Link>
        <Link to="/addForm"> Add Form </Link>
        <Link to="/login"> Login </Link>
        <Link to="/registration"> Registration </Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addForm" exact element={<AddForm />} />
          <Route path="/form/:id" exact element={<SeeForm />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registration />} />
        </Routes>
      </Router>
    </div>
    <Footer />
    </>
  );
}

export default App;
