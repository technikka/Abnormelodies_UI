import { useState } from "react";
import { errorData } from "../Data";
import NoteWholeIcon from "../icons/NoteWholeIcon";
import NoteHalfIcon from "../icons/NoteHalfIcon";
import NoteQuarterIcon from "../icons/NoteQuarterIcon";
import NoteEighthIcon from "../icons/NoteEighthIcon";
import NoteTripletIcon from "../icons/NoteTripletIcon";
import DotIcon from "../icons/DotIcon";
import TieIcon from "../icons/TieIcon";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TooltipPopover from "../components/TooltipPopover";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
  Tooltip, 
  Typography,
} from "@mui/material";

const FormNoteDurations = (props) => {
  const boxColor = "secondary";

  const [errors, setErrors] = useState([]);

  const isChecked = (duration) => {
    return props.note_durations[duration] === true;
  };

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
    return (
      <div >
        <Typography variant={"subtitle2"}>Notes and Augmentations</Typography>
        <br />
        <Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <NoteEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
          </Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <NoteQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
          </Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <NoteHalfIcon /> <b>Half</b> - 1/2 of a whole.
          </Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <NoteWholeIcon /> <b>Whole</b>
          </Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <NoteTripletIcon /> <b>Triplet</b> - the sum of the set equals 1/2 of a whole.
          </Typography>
          <br />
          <Typography variant="caption" style={{display: "block"}}>
            <DotIcon /> <b>Dots</b> - extend its note's duration by 1/2 that note's value.
          </Typography>
          <Typography variant="caption" style={{display: "block"}}>
            <TieIcon /> <b>Ties</b> - connect two notes of the same pitch to create one duration.
          </Typography>
          <br />
          <Typography variant="caption">
            Check out <TipsAndUpdatesIcon fontSize="small" color="secondary"/> for more detailed information.
          </Typography>
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <FormLabel>Note Durations To Allow</FormLabel>
          <TooltipPopover content={popoverContent()}/>
        </Grid>

        <Grid item>
          <FormGroup row>
          <Tooltip placement="top" disableInteractive enterDelay={1500}
              title={
                props.time_signature === "6/8"
                  ? "Type required in 6/8 time."
                  : ""
              }
              arrow
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="1/8"
                    disabled={isDisabled("1/8")}
                    checked={isChecked("1/8")}
                    onChange={props.handleNoteDurationsChange}
                    color={boxColor} 
                  />
                }
                label={<NoteEighthIcon />}
              />
            </Tooltip>
            
            <FormControlLabel
              control={
                <Checkbox
                  name="1/4"
                  disabled={isDisabled("1/4")}
                  checked={isChecked("1/4")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<NoteQuarterIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="1/2"
                  disabled={isDisabled("1/2")}
                  checked={isChecked("1/2")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<NoteHalfIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="1"
                  disabled={isDisabled("1")}
                  checked={isChecked("1")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<NoteWholeIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="triplet"
                  disabled={isDisabled("triplet")}
                  checked={isChecked("triplet")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<NoteTripletIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="dot"
                  disabled={isDisabled("dot")}
                  checked={isChecked("dot")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<DotIcon />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="tie"
                  disabled={isDisabled("tie")}
                  checked={isChecked("tie")}
                  onChange={props.handleNoteDurationsChange}
                  color={boxColor} 
                />
              }
              label={<TieIcon />}
            />
          </FormGroup>
        </Grid>
      </Grid>
      {!validate() && <FormHelperText error>{errorMessage()}</FormHelperText>}
    </div>
  );
};

export default FormNoteDurations;
