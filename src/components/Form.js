import { useState } from "react";
import FormPitch from "./FormPitch";
import FormTimeSignature from "./FormTimeSignature";
import FormMeasures from "./FormMeasures";
import FormNoteDurations from "./FormNoteDurations";
import FormRestDurations from "./FormRestDurations";
import FormRules from "./FormRules";

const Form = (props) => {
  const [key, setKey] = useState("C");
  const [scale, setScale] = useState("major");
  const [note_start, setNoteStart] = useState("C");
  const [note_end, setNoteEnd] = useState("C");
  const [octave_start, setOctaveStart] = useState("3");
  const [octave_end, setOctaveEnd] = useState("5");
  const [time_signature, setTimeSignature] = useState("4/4");
  const [num_measures, setNumMeasures] = useState("8");
  const [note_durations, setNoteDurations] = useState({});
  const [rest_durations, setRestDurations] = useState({});
  const [rules, setRules] = useState([]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  const handleNoteStartChange = (event) => {
    setNoteStart(event.target.value);
  };

  const handleNoteEndChange = (event) => {
    setNoteEnd(event.target.value);
  };

  const handleOctaveStartChange = (event) => {
    setOctaveStart(event.target.value);
  };

  const handleOctaveEndChange = (event) => {
    setOctaveEnd(event.target.value);
  };

  const handleTimeSignatureChange = (event) => {
    setTimeSignature(event.target.value);
  };

  const handleNumMeasuresChange = (event) => {
    setNumMeasures(event.target.value);
  };

  const handleNoteDurationsChange = (event) => {
    const inputs = Array.from(event.target.parentElement.children).filter(child => child.type === "checkbox");
    let hash = {};
    inputs.forEach( input => { hash[input.name] = input.checked });
    setNoteDurations(hash);
  };

  const handleRestDurationsChange = (event) => {
    const inputs = Array.from(event.target.parentElement.children).filter(child => child.type === "checkbox");
    let hash = {};
    inputs.forEach( input => { hash[input.name] = input.checked });
    setRestDurations(hash);
  };

  const handleRulesChange = (event) => {
    const inputs = Array.from(event.target.parentElement.children).filter(child => child.type === "checkbox");
    let hash = {};
    inputs.forEach( input => { hash[input.name] = input.checked });
    setRules(hash);
  };

  const handleSubmission = () => {
    props.getMelody({
      key: key,
      scale: scale,
      note_start: note_start,
      note_end: note_end,
      octave_start: octave_start,
      octave_end: octave_end,
      time_signature: time_signature,
      num_measures: num_measures,
      note_durations: note_durations,
      rest_durations: rest_durations,
      rules,
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmission();
    }}>
      <FormPitch
        handleKeyChange={handleKeyChange}
        handleScaleChange={handleScaleChange}
        handleNoteStartChange={handleNoteStartChange}
        handleNoteEndChange={handleNoteEndChange}
        handleOctaveStartChange={handleOctaveStartChange}
        handleOctaveEndChange={handleOctaveEndChange}
      />
      <FormTimeSignature
        handleTimeSignatureChange={handleTimeSignatureChange}
      />
      <FormMeasures handleNumMeasuresChange={handleNumMeasuresChange} />
      <FormNoteDurations
        handleNoteDurationsChange={handleNoteDurationsChange}
      />
      <FormRestDurations
        handleRestDurationsChange={handleRestDurationsChange}
      />
      <FormRules handleRulesChange={handleRulesChange} />

      <input
        type="submit"
        value="Generate Melody"
      />
    </form>
  );
};

export default Form;
