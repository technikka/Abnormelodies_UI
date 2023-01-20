import { useState } from "react";
import FormPitch from "./FormPitch";
import FormTimeSignature from "./FormTimeSignature";
import FormMeasures from "./FormMeasures";
import FormNoteDurations from "./FormNoteDurations";
import FormRestDurations from "./FormRestDurations";
import FormRules from "./FormRules";

const Form = () => {
  const [key, setKey] = useState("C");
  const [scale, setScale] = useState("Major");
  const [note_start, setNoteStart] = useState("C");
  const [note_end, setNoteEnd] = useState("C");
  const [octave_start, setOctaveStart] = useState("3");
  const [octave_end, setOctaveEnd] = useState("5");
  const [time_signature, setTimeSignature] = useState("4/4");
  const [num_measures, setNumMeasures] = useState("8");
  const [note_durations, setNoteDurations] = useState([]);
  const [rest_durations, setRestDurations] = useState([]);
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
    if (event.target.checked) {
      setNoteDurations(note_durations.concat(event.target.value));
    } else {
      setNoteDurations(
        note_durations.filter((dur) => dur !== event.target.value)
      );
    }
  };

  const handleRestDurationsChange = (event) => {
    if (event.target.checked) {
      setRestDurations(rest_durations.concat(event.target.value));
    } else {
      setRestDurations(
        rest_durations.filter((dur) => dur !== event.target.value)
      );
    }
  };

  const handleRulesChange = (event) => {
    if (event.target.checked) {
      setRules(rules.concat(event.target.value));
    } else {
      setRules(rules.filter((dur) => dur !== event.target.value));
    }
  };

  return (
    <form action="">
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

      <input type="submit" value="Generate Melody"/>
    </form>
  );
};

export default Form;
