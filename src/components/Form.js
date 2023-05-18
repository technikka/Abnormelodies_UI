import { useState, useRef } from "react";
import FormKey from "./FormKey";
import FormRegister from "./FormRegister";
import FormTimeSignature from "./FormTimeSignature";
import FormMeasures from "./FormMeasures";
import FormNoteDurations from "./FormNoteDurations";
import FormRestDurations from "./FormRestDurations";
import SettingsIcon from "@mui/icons-material/Settings";
import FormRules from "./FormRules";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import { majorTonics, minorTonics, getScale } from "../Data";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Button,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";

const Form = (props) => {
  const theme = useTheme();

  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const [expanded, setExpanded] = useState(true);

  const handleAccordionState = () => {
    setExpanded(!expanded);
  };

  const [tonic, setTonic] = useState("C");
  const [scale, setScale] = useState("major");

  const [note_start, setNoteStart] = useState(tonic);
  const [note_end, setNoteEnd] = useState(tonic);
  const [octave_start, setOctaveStart] = useState("4");
  const [octave_end, setOctaveEnd] = useState("5");

  const [time_signature, setTimeSignature] = useState("4/4");

  const [num_measures, setNumMeasures] = useState("8");
  const minMeasures = 1;
  const maxMeasures = 16;

  const [note_durations, setNoteDurations] = useState({
    "1": false,
    "1/2": true,
    "1/4": true,
    "1/8": true,
    triplet: false,
    dot: false,
    tie: false,
  });

  const [rest_durations, setRestDurations] = useState({
    "1": false,
    "1/2": false,
    "1/4": true,
    "1/8": true,
  });

  const [rules, setRules] = useState({
    smooth_resolve: true,
  });

  const errors = useRef([]);
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const modeTonics = () => {
    return scale === "major" ? majorTonics : minorTonics;
  };

  const nonSelectedModeTonics = () => {
    return scale === "major" ? minorTonics : majorTonics;
  };

  const validTonicChange = (value) => {
    return (
      // non-selected because a change in mode is about to be handled.
      nonSelectedModeTonics().includes(value) ? true : false
    );
  };

  const handleTonicChange = (event) => {
    const newTonic = event.target.value;
    setTonic(newTonic);

    if (!getScale(newTonic, scale).includes(note_start)) {
      setNoteStart(newTonic);
    }
    if (!getScale(newTonic, scale).includes(note_end)) {
      setNoteEnd(newTonic);
    }
  };

  const equivalentChromaticNote = (selectedTonic) => {
    const index = modeTonics().indexOf(selectedTonic);
    const array = nonSelectedModeTonics();
    return array[index];
  };

  const handleTonicValidity = () => {
    let newTonic;
    if (!validTonicChange(tonic)) {
      newTonic = equivalentChromaticNote(tonic);
      setTonic(newTonic);
    }

    const newScale = scale === "major" ? "minor" : "major";
    const currentTonic = newTonic || tonic;
    if (!getScale(currentTonic, newScale).includes(note_start)) {
      setNoteStart(currentTonic);
    }
    if (!getScale(currentTonic, newScale).includes(note_end)) {
      setNoteEnd(currentTonic);
    }
  };

  const handleScaleChange = (event) => {
    handleTonicValidity(event);
    setScale(event.target.value);
  };

  const handleNoteStartChange = (event) => {
    setNoteStart(event.target.value);
  };

  const handleNoteEndChange = (event) => {
    setNoteEnd(event.target.value);
  };

  const handleOctaveStartChange = (event) => {
    if (event.target.value > octave_end) {
      setOctaveEnd(event.target.value);
    }
    setOctaveStart(event.target.value);
  };

  const handleOctaveEndChange = (event) => {
    setOctaveEnd(event.target.value);
  };

  const handleTimeSignatureChange = (event, newTonic) => {
    if (newTonic !== null) {
      setTimeSignature(newTonic);
    } else {
      return;
    }
    if (newTonic === "6/8") {
      setNoteDurations({ ...note_durations, "1/8": true, "1": false });
      setRestDurations({ ...rest_durations, "1": false });
    }
    if (newTonic === "3/4") {
      setNoteDurations({ ...note_durations, "1": false });
      setRestDurations({ ...rest_durations, "1": false });
    }
  };

  const handleNumMeasuresChange = (event) => {
    setNumMeasures(event.target.value);
  };

  const handleNoteDurationsChange = (event) => {
    const note = event.currentTarget.value;
    let bool = !note_durations[note];

    if (time_signature === "6/8" && note === "1/8") {
      bool = true;
    }
    if (time_signature === "6/8" && note === "1") {
      bool = false;
    }
    setNoteDurations({ ...note_durations, [note]: bool });
  };

  const handleRestDurationsChange = (event) => {
    const rest = event.currentTarget.value;
    let bool = !rest_durations[rest];

    if (time_signature === "6/8" && rest === "1") {
      bool = false;
    }
    setRestDurations({ ...rest_durations, [rest]: bool });
  };

  const handleRulesChange = (event) => {
    const rule = event.target.name;
    const bool = event.target.checked;
    setRules({ ...rules, [rule]: bool });
  };

  const handleErrors = (action, errorCode) => {
    if (action === "add" && !errors.current.includes(errorCode)) {
      errors.current = errors.current.concat(errorCode);
    } else if (action === "remove" && errors.current.includes(errorCode)) {
      errors.current = errors.current.filter((error) => {
        return error !== errorCode;
      });
    }
  };

  const handleSubmission = () => {
    if (errors.current.length > 0) {
      setAlertIsVisible(true);

      setTimeout(() => {
        setAlertIsVisible(false);
      }, 10000);
      return;
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

  const getSymbol = (type) => {
    if (type === "b") {
      return "\u266d";
    }
    return "\u266f";
  };

  const formatTonicString = (tonic) => {
    let symbol;
    if (tonic.length === 2) {
      symbol = getSymbol(tonic[1]);
      return tonic[0] + symbol;
    }
    return tonic;
  };

  const formStyle = {
    padding: "0.2em",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5em",
  };

  const accordionStyle = {
    backgroundColor: theme.palette.background.main,
    borderRadius: "0",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2.6px 3px",
  };

  const itemStyle = {
    display: "inline-block",
    width: "max-content",
  };

  return (
    <div style={{ maxWidth: theme.appMaxWidth }}>
      <Accordion
        style={accordionStyle}
        expanded={expanded}
        onChange={handleAccordionState}
        disableGutters
      >
        <AccordionSummary
          expandIcon={
            <IconButton
              color="tertiary"
              aria-label="expand collapse melody form"
            >
              <SettingsIcon fontSize="large" />
            </IconButton>
          }
          tabIndex={-1}
          aria-controls="melody controls"
          style={{
            minHeight: "52px",
          }}
          sx={{
            pointerEvents: "none",
            "& .MuiAccordionSummary-expandIconWrapper": {
              position: "relative",
              bottom: "6px",
              pointerEvents: "auto",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "inherit",
            },
          }}
        ></AccordionSummary>
        <AccordionDetails>
          <form
            id="melody-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (mobile && expanded === true) {
                setExpanded(false);
              };
              handleSubmission();
            }}
          >
            <div style={formStyle}>
              <div className="key" style={itemStyle}>
                <FormKey
                  scale={scale}
                  handleScaleChange={handleScaleChange}
                  tonic={tonic}
                  handleTonicChange={handleTonicChange}
                  handleErrors={handleErrors}
                  formatTonicString={formatTonicString}
                />
              </div>
              <div style={itemStyle}>
                <FormRegister
                  scale={scale}
                  tonic={tonic}
                  note_start={note_start}
                  handleNoteStartChange={handleNoteStartChange}
                  note_end={note_end}
                  handleNoteEndChange={handleNoteEndChange}
                  octave_start={octave_start}
                  handleOctaveStartChange={handleOctaveStartChange}
                  octave_end={octave_end}
                  handleOctaveEndChange={handleOctaveEndChange}
                  handleErrors={handleErrors}
                  formatTonicString={formatTonicString}
                />
              </div>
              <div style={itemStyle}>
                <FormNoteDurations
                  note_durations={note_durations}
                  handleNoteDurationsChange={handleNoteDurationsChange}
                  time_signature={time_signature}
                  handleErrors={handleErrors}
                  rest_durations={rest_durations}
                />
              </div>
              <div style={itemStyle}>
                <FormRestDurations
                  rest_durations={rest_durations}
                  handleRestDurationsChange={handleRestDurationsChange}
                  time_signature={time_signature}
                />
              </div>
              <div style={itemStyle}>
                <FormTimeSignature
                  time_signature={time_signature}
                  handleTimeSignatureChange={handleTimeSignatureChange}
                />
              </div>
              <div style={itemStyle}>
                <FormMeasures
                  num_measures={num_measures}
                  minMeasures={minMeasures}
                  maxMeasures={maxMeasures}
                  handleNumMeasuresChange={handleNumMeasuresChange}
                />
              </div>
              <div style={itemStyle}>
                <FormRules
                  rules={rules}
                  handleRulesChange={handleRulesChange}
                />
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <div
        style={{
          padding: "1em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          form="melody-form"
          type="submit"
          size="large"
          style={{ fontSize: "1.2em" }}
          startIcon={<MusicNoteOutlinedIcon style={{ fontSize: "inherit" }} />}
        >
          Generate Melody
        </Button>
      </div>
      {alertIsVisible && (
        <Alert
          role="alert"
          aria-live="assertive"
          severity="error"
          sx={{ my: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          There are unresolved errors on this page preventing a new melody from
          generating.
        </Alert>
      )}
    </div>
  );
};

export default Form;
