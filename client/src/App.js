import './index.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Form from './components/Form';

function App() {
  const [listOfForms, setListOfForms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/forms").then((response) => {
      setListOfForms(response.data);
    });
  }, [])

  return (
    <div className="container">
      {listOfForms.map((value, key) => {
        return <Form form={ value } />
      })}
    </div>
  );
}

export default App;
