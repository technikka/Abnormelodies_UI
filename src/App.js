import { useState, useRef } from "react";
import "./styles/App.css";
import Form from "./components/Form";
import axios from "axios";
import Melody from "./components/Melody";
import FragmentService from "./FragmentService";
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
  };

  // 350 is an arbitrary value chosen to produce an average tempo
  const toneDuration = (fragment, i) => {
    if (fragment.tie && fragment.tie === "start") {
      return (fragment.duration + melodyFragments[i + 1].duration) / 350;
    } else if (fragment.tie && fragment.tie === "stop") {
      return 0;
    } else {
      return fragment.duration / 350;
    }
  };

  const playMelody = () => {
    const synth = new Tone.Synth().toDestination();
    let time = Tone.now();

    melodyFragments.forEach((fragment, i) => {
      const duration = toneDuration(fragment, i)
      synth.triggerAttackRelease(fragment["pitch"], duration, time);
      time += duration;
    });
  };

  return (
    <div>
      <Form getMelody={getMelody} />
      <button onClick={startTone}>Play</button>
      {melodyMounted.current && <Melody xml={melodyXML} />}
    </div>
  );
};

export default App;
