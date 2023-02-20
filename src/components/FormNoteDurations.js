import { useState } from "react";
import { errorData } from "../Data";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
  Tooltip,
} from "@mui/material";

const FormNoteDurations = (props) => {
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
    }
    return true;
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <FormLabel>Note Durations To Allow</FormLabel>
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="1"
                  disabled={isDisabled("1")}
                  checked={isChecked("1")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Whole"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="1/2"
                  disabled={isDisabled("1/2")}
                  checked={isChecked("1/2")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Half"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="1/4"
                  disabled={isDisabled("1/4")}
                  checked={isChecked("1/4")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Quarter"
            />

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
                  />
                }
                label="Eighth"
              />
            </Tooltip>

            <FormControlLabel
              control={
                <Checkbox
                  name="triplet"
                  disabled={isDisabled("triplet")}
                  checked={isChecked("triplet")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Triplet"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="dot"
                  disabled={isDisabled("dot")}
                  checked={isChecked("dot")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Dot"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="tie"
                  disabled={isDisabled("tie")}
                  checked={isChecked("tie")}
                  onChange={props.handleNoteDurationsChange}
                />
              }
              label="Tie"
            />
          </FormGroup>
        </Grid>
      </Grid>
      {!validate() && <FormHelperText error>{errorMessage()}</FormHelperText>}
    </div>
  );
};

export default FormNoteDurations;
