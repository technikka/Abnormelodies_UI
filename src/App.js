import { useState } from "react";

import "./styles/App.css";
import Form from "./components/Form";

const App = () => {
  // do i need this or can i just send params as argument to get melody? minimal state
  // const [requestParams, setRequestParams] = useState({});

  const [melody, setMelody] = useState({});

  const getMelody = (params) => {
    console.log(params);
  }

  // method to get melody
  return (
    <div>
      <Form getMelody={getMelody} />
    </div>
  );
};

export default App;
