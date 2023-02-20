import { useState, useRef } from "react";
import FormPitch from "./FormPitch";
import FormTimeSignature from "./FormTimeSignature";
import FormMeasures from "./FormMeasures";
import FormNoteDurations from "./FormNoteDurations";
import FormRestDurations from "./FormRestDurations";
import FormRules from "./FormRules";
import { Button, Alert, AlertTitle } from '@mui/material';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';

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
  const errors = useRef([])
  const [canSubmit, setCanSubmit] = useState(true);

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
    if (event.target.value === "6/8") {
      setNoteDurations(
        {...note_durations, "1/8": true, "1": false }
      )
      setRestDurations(
        { ...rest_durations, "1": false }
      )
    }
    if (event.target.value === "3/4") {
      setNoteDurations(
        {...note_durations, "1/8": true, "1": false }
      )
      setRestDurations(
        { ...rest_durations, "1": false }
      )
    }
  };

  const handleNumMeasuresChange = (event) => {
    setNumMeasures(event.target.value);
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

  const handleErrors = (action, errorCode) => {
    if (action === "add" && !errors.current.includes(errorCode)) {
      errors.current = errors.current.concat(errorCode)
    } else if (action === "remove" && errors.current.includes(errorCode)) {
      errors.current = errors.current.filter((error) => {return error !== errorCode})
    }
  }

  const handleSubmission = () => {
    if (errors.current.length > 0) {
      setCanSubmit(false)
      return
    } else {
      setCanSubmit(true)
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
        handleErrors={handleErrors}
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
        time_signature={time_signature}
        handleErrors={handleErrors}
        rest_durations={rest_durations}
      />
      <FormRestDurations
        rest_durations={rest_durations}
        handleRestDurationsChange={handleRestDurationsChange}
        time_signature={time_signature}
      />
      <FormRules 
        rules={rules}
        handleRulesChange={handleRulesChange} />

      { !canSubmit &&
      <Alert severity="error" sx={{my:2}}>
        <AlertTitle>Error</AlertTitle>
        There are unresolved errors preventing a new melody from generating.
      </Alert> }

      <Button variant="contained" type="submit" startIcon={<MusicNoteOutlinedIcon />}>
        Generate Melody
      </Button>
    </form>
  );
};

export default Form;
