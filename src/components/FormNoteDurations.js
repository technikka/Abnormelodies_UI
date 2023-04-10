import { useState, useEffect } from "react";
import { errorData } from "../Data";
import NoteWholeIcon from "../icons/NoteWholeIcon";
import NoteHalfIcon from "../icons/NoteHalfIcon";
import NoteQuarterIcon from "../icons/NoteQuarterIcon";
import NoteEighthIcon from "../icons/NoteEighthIcon";
import NoteTripletIcon from "../icons/NoteTripletIcon";
import DotIcon from "../icons/DotIcon";
import TieIcon from "../icons/TieIcon";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from "@mui/material/styles";
import {
  FormLabel,
  FormHelperText,
  Tooltip,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Popper,
  Paper,
  ClickAwayListener,
  Alert
} from "@mui/material";

const FormNoteDurations = (props) => {
  const theme = useTheme();

  const [errors, setErrors] = useState([]);

  const selectedDurations = () => {
    return Object.keys(props.note_durations).filter(
      (value) => props.note_durations[value] === true
    );
  };

  const [selected, setSelected] = useState(selectedDurations());

  const handleSelected = (event, selected) => {
    setSelected(selected);
    props.handleNoteDurationsChange(event);
  };

  useEffect(() => {
    setSelected(selectedDurations());
  }, [props.note_durations])

  const isDisabled = (type) => {
    if (props.time_signature === "6/8" && type === "1") {
      return true;
    }
    if (props.time_signature === "3/4" && type === "1") {
      return true;
    }
    return false;
  };

  const handleError = (action, code) => {
    if (action === "add") {
      if (errors.includes(code)) {
        return;
      } else {
        setErrors(errors.concat(code));
        props.handleErrors("add", code);
      }
    }

    if (action === "remove") {
      if (errors.includes(code)) {
        setErrors(
          errors.filter((error) => {
            return error !== code;
          })
        );
        props.handleErrors("remove", code);
      } else {
        return;
      }
    }
  };

  const errorMessage = () => {
    let entry = errorData.find((error) => error.code === errors[0]);
    if (entry) {
      return entry.message;
    }
  };

  const any_note_selected = () => {
    const notes = ["1", "1/2", "1/4", "1/8", "triplet"];
    for (const note of notes) {
      if (props.note_durations[note] === true) {
        return true;
      }
    }
    return false;
  };

  const threeFourNoteFit = () => {
    if (
      props.note_durations["1/4"] === true ||
      props.note_durations["1/8"] === true ||
      props.rest_durations["1/4"] === true ||
      props.rest_durations["1/8"] === true
    )
      return true;
  };

  const validate = () => {
    if (!any_note_selected()) {
      handleError("add", "421");
      return false;
    } else {
      handleError("remove", "421");
    }
    if (props.time_signature === "3/4") {
      if (props.note_durations["1/2"] === true) {
        if (!threeFourNoteFit() && props.note_durations["dot"] !== true) {
          handleError("add", "344");
          return false;
        } else {
          handleError("remove", "344");
        }
      }
      if (props.note_durations["triplet"] === true) {
        if (!threeFourNoteFit()) {
          handleError("add", "333");
          return false;
        } else {
          handleError("remove", "333");
        }
      }
    } else {
      handleError("remove", "344");
      handleError("remove", "333");
    }
    return true;
  };

  const popoverContent = () => {
    const entryContainerStyle = {
      display: "flex", 
      flexDirection: "columns",
      gap: "8px", 
      alignItems: "baseline",
      width: "max-content" 
    }
    return (
      <div>
        <Typography variant={"subtitle2"}>Notes and Augmentations</Typography>
        <br />
        <Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <NoteEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <NoteQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <NoteHalfIcon /> <b>Half</b> - 1/2 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <NoteWholeIcon fontSize="small" style={{paddingRight: "3px"}} /> <b>Whole</b>
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <NoteTripletIcon /> <b>Triplet</b> - the sum of the set equals 1/2
            of a whole.
          </Typography>
          <br />
          <Typography variant="caption" style={entryContainerStyle}>
            <DotIcon fontSize="small" style={{paddingRight: "5px"}}/> <b>Dots</b> - extend its note's duration by 1/2 that
            note's value.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <TieIcon /> <b>Ties</b> - connect two notes of the same pitch to
            create one duration.
          </Typography>
          <br />
          <Typography variant="caption" style={entryContainerStyle}>
            Check out <TipsAndUpdatesIcon fontSize="small" color="secondary" style={{padding: "0 5px"}} />
            for more detailed information.
          </Typography>
        </Typography>
      </div>
    );
  };

  return (
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Note Durations Allowed</FormLabel>
        <TooltipPopover content={popoverContent()} label="note durations"/>
      </div>
      <ToggleButtonGroup
        onChange={handleSelected}
        color="primary"
        value={selected}
        aria-label="note duration select"
      >
        
        <ToggleButton value="1/8" disabled={isDisabled("1/8")} aria-label="eighth">
          <Tooltip placement="top" disableInteractive enterDelay={1500}
            title={
              props.time_signature === "6/8"
                ? "Type required in 6/8 time."
                : ""
            }
            arrow
          >
            <NoteEighthIcon fontSize="large" />
            </Tooltip>
        </ToggleButton>
        <ToggleButton value="1/4" disabled={isDisabled("1/4")} aria-label="quarter">
          <NoteQuarterIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton value="1/2" disabled={isDisabled("1/2")} aria-label="half">
          <NoteHalfIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton value="1" disabled={isDisabled("1")} size="large" aria-label="whole">
          <NoteWholeIcon />
        </ToggleButton>
        <ToggleButton value="triplet" disabled={isDisabled("triplet")}aria-label="triplet">
          <NoteTripletIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton value="dot" disabled={isDisabled("dot")} size="large" aria-label="dot">
          <DotIcon  />
        </ToggleButton>
        <ToggleButton value="tie" disabled={isDisabled("tie")} aria-label="tie">
          <TieIcon fontSize="large" />
        </ToggleButton>
      </ToggleButtonGroup>

      {!validate() &&
        <FormHelperText error 
        style={{
          maxWidth: "400px",
        }}
      >
        {errorMessage()}
      </FormHelperText>
      }

    </div>
  );
};

export default FormNoteDurations;
