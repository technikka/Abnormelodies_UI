import { useState } from "react";
import FormPitch from "./FormPitch";
import FormTimeSignature from "./FormTimeSignature";
import FormMeasures from "./FormMeasures";
import FormNoteDurations from "./FormNoteDurations";
import FormRestDurations from "./FormRestDurations";
import FormRules from "./FormRules";

const Form = (props) => {
  const [tonic, setTonic] = useState("C");
  const [scale, setScale] = useState("major");

  const [note_start, setNoteStart] = useState(tonic);
  const [note_end, setNoteEnd] = useState(tonic);
  const [octave_start, setOctaveStart] = useState("4");
  const [octave_end, setOctaveEnd] = useState("5");

  const [time_signature, setTimeSignature] = useState("4/4");

  const [num_measures, setNumMeasures] = useState("8");
  const minMeasures = 1;
  const maxMeasures = 12;

  const [note_durations, setNoteDurations] = useState({
    "1": false,
    "1/2": false,
    "1/4": true,
    "1/8": true,
    "triplet": false,
    "dot": false,
    "tie": false,
  });

  const [rest_durations, setRestDurations] = useState({
    "1": false,
    "1/2": false,
    "1/4": false,
    "1/8": true,
  });

  const [rules, setRules] = useState({
    "smooth_resolve": true,
  });

  const [syncTonics, setSyncTonics] = useState(true);

  const [errorDisplay, setErrorDisplay] = useState("");

  const handleTonicChange = (event) => {
    setTonic(event.target.value);
    if (syncTonics === true) {
      setNoteStart(event.target.value);
      setNoteEnd(event.target.value);
    }
  };

  const handleSyncTonicsChange = () => {
    setSyncTonics(!syncTonics);
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
    // eighth notes must be permitted in 6/8 time
    if (event.target.value === "6/8") {
      setNoteDurations(
        {...note_durations, "1/8": true }
      )
    }
  };

  const handleNumMeasuresChange = (event) => {
    const num = event.target.value;
    if (num >= minMeasures && num <= maxMeasures) {
      setNumMeasures(event.target.value);
    }
  };

  const handleNoteDurationsChange = (event) => {
    const note = event.target.name;
    let bool = event.target.checked;
    if (time_signature === "6/8" && note === "1/8") {
      bool = true;
    }
    if (time_signature === "6/8" && note === "1") {
      bool = false;
    }
    setNoteDurations(
      {...note_durations, [note]: bool }
    )
  };

  const handleRestDurationsChange = (event) => {
    const rest = event.target.name;
    let bool = event.target.checked;
    if (time_signature === "6/8" && rest === "1") {
      bool = false;
    }
    setRestDurations(
      {...rest_durations, [rest]: bool }
    )
  };

  const handleRulesChange = (event) => {
    const rule = event.target.name;
    const bool = event.target.checked;
    setRules(
      {...rules, [rule]: bool }
    )
  };

  const any_note_selected = () => {
    const notes = ["1", "1/2", "1/4", "1/8", "triplet"]
    for (const note of notes) {
     if (note_durations[note] === true) {
      return true;
     }
    }
    return false;
  }

  const threeFourNoteFit = () => {
    if (
      note_durations["1/4"] === true ||
      note_durations["1/8"] === true ||
      rest_durations["1/4"] === true ||
      rest_durations["1/8"] === true
    ) return true
  }

  const validateSubmission = () => {
    setErrorDisplay("");

    if (time_signature === "4/4") {
      if (any_note_selected()) {
        return true
      } else {
        setErrorDisplay(
          "You must select at least one note type to allow"
          )
      }
      return any_note_selected()
    }
    
    if (time_signature === "3/4") {
        if (note_durations["1/2"] === true) {
          if (threeFourNoteFit() && note_durations["dot"] === true ) {
            return true
          } else {
            setErrorDisplay(
              "You must additionally allow one of the following types to accompany a half note in 3/4 time: eighth note, quarter note, dot, eighth rest, or quarter rest"
              )
          }
        }
        if (note_durations["triplet"] === true) {
          if (threeFourNoteFit()) {
            return true
          } else {
            setErrorDisplay(
              "You must additionally allow one of the following types to accompany a triplet in 3/4 time: eighth note, quarter note, dot, eighth rest, or quarter rest"
              )
          }
        }
    }
    
    if (time_signature === "6/8") {
      if (note_durations["1/8"] === true) {
        return true
      } else {
        setErrorDisplay(
          "You must allow 1/8 notes in 6/8 time."
        )
      }
      if (note_durations["1"] === false) {
        return true
      } else {
        setErrorDisplay(
          "Whole notes are not allowed in 6/8 time."
        )
      }
    }

    return false
  }

  const handleSubmission = () => {
    const validate = validateSubmission();
    if (!validate) {
      return
    }
    props.getMelody({
      tonic: tonic,
      scale: scale,
      note_start: note_start,
      note_end: note_end,
      octave_start: octave_start,
      octave_end: octave_end,
      time_signature: time_signature,
      num_measures: num_measures,
      note_durations: note_durations,
      rest_durations: rest_durations,
      rules: rules,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmission();
      }}
    > 
      <div>{errorDisplay}</div>
      <FormPitch
        scale={scale}
        handleScaleChange={handleScaleChange}
        tonic={tonic}
        handleTonicChange={handleTonicChange}
        note_start={note_start}
        handleNoteStartChange={handleNoteStartChange}
        note_end={note_end}
        handleNoteEndChange={handleNoteEndChange}
        octave_start={octave_start}
        handleOctaveStartChange={handleOctaveStartChange}
        octave_end={octave_end}
        handleOctaveEndChange={handleOctaveEndChange}
        syncTonics={syncTonics}
        handleSyncTonicsChange={handleSyncTonicsChange}
      />
      <FormTimeSignature
        time_signature={time_signature}
        handleTimeSignatureChange={handleTimeSignatureChange}
      />
      <FormMeasures
        num_measures={num_measures}
        minMeasures={minMeasures}
        maxMeasures={maxMeasures}
        handleNumMeasuresChange={handleNumMeasuresChange}
      />
      <FormNoteDurations
        note_durations={note_durations}
        handleNoteDurationsChange={handleNoteDurationsChange}
      />
      <FormRestDurations
        rest_durations={rest_durations}
        handleRestDurationsChange={handleRestDurationsChange}
      />
      <FormRules 
        rules={rules}
        handleRulesChange={handleRulesChange} />

      <input type="submit" value="Generate Melody" />
    </form>
  );
};

export default Form;
