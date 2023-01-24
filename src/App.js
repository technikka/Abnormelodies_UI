import { useState } from "react";
import "./styles/App.css";
import Form from "./components/Form";
import axios from "axios";

const App = () => {

  const [melody, setMelody] = useState({});

  const getMelody = (params) => {
    console.log(params);
    axios.get("http://localhost:3001/api/v1/melodies", {
      params: params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/xml"
      }
    })
    .then(response => {
      // console.log(response.data)
      // setMelody(response.data)
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <Form getMelody={getMelody} />
    </div>
  );
};

export default App;
