import { useState, useRef } from "react";
import "./styles/App.css";
import Form from "./components/Form";
import axios from "axios";
import Melody from "./components/Melody";
import  FragmentService from "./FragmentService";
import * as Tone from "tone";

const App = () => {
  const [melodyXML, setMelodyXML] = useState({});
  const [melodyFragments, setMelodyFragments] = useState([]);
  const melodyMounted = useRef(false);

  const mountMelody = () => {
    melodyMounted.current = true;
  };

  const getMelody = (params) => {
    axios
      .get("http://localhost:3001/api/v1/melodies", {
        params: params,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/xml",
        },
      })
      .then((response) => {
        setMelodyXML(response.data);
        const fragments = FragmentService.getFragments(response.data);
        setMelodyFragments(fragments);
        mountMelody();
      })
      .catch((error) => console.log(error));
  };

  const startTone = async () => {
    await Tone.start();
    playMelody();
  }

  const playMelody = () => {
    console.log(melodyXML);
    const synth = new Tone.Synth().toDestination();
    let time = Tone.now();

    melodyFragments.forEach((fragment) => {
      const duration = Number(fragment["duration"]) / 350;
      synth.triggerAttackRelease(fragment["pitch"], duration, time);
      time += duration;
    })
  }

  return (
    <div>
      <Form getMelody={getMelody} />
      <button onClick={startTone}>Play</button>
      {melodyMounted.current && <Melody xml={melodyXML} />}
    </div>
  );
};

export default App;
