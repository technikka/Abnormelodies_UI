import { useState, useRef } from "react";
import "./styles/App.css";
import Form from "./components/Form";
import axios from "axios";
import Melody from "./components/Melody";

const App = () => {
  const [melodyXML, setMelodyXML] = useState({});
  const melodyMounted = useRef(false);

  const mountMelody = () => {
    melodyMounted.current = true;
  }

  const getMelody = (params) => {
    console.log('here')
    axios.get("http://localhost:3001/api/v1/melodies", {
      params: params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/xml"
      }
    })
    .then(response => {
      setMelodyXML(response.data);
      mountMelody();
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <Form getMelody={getMelody} />

      {melodyMounted.current && (
      <Melody  xml={melodyXML}/>
      )}

    </div>
  );
};

export default App;
