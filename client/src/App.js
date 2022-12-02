import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import AddForm from './pages/AddForm';

function App() {
  
  return (
    <div className="container">
      <Router>
        <Link to="/addForm"> Add Form </Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addForm" exact element={<AddForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
