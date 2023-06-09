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
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  FormLabel,
  FormHelperText,
  Tooltip,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const FormNoteDurations = (props) => {
  const theme = useTheme();
  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

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
  }, [props.note_durations]);

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
    ) {
      return true;
    }
  };

  const validate = () => {
    errorCheck();
    if (errors.length > 0) {
      return false;
    }
    return true;
  };

  const errorCheck = () => {
    if (props.time_signature === "3/4") {
      if (props.note_durations["1/2"] === true) {
        if (!threeFourNoteFit() && props.note_durations["dot"] !== true) {
          handleError("add", "344");
        } else {
          handleError("remove", "344");
        }
      } else {
        handleError("remove", "344");
      }
      if (props.note_durations["triplet"] === true) {
        if (!threeFourNoteFit() && props.note_durations["1/2"] === false) {
          handleError("add", "333");
        } else {
          handleError("remove", "333");
        }
      } else {
        handleError("remove", "333");
      }
    } else {
      handleError("remove", "344");
      handleError("remove", "333");
    }
    if (!any_note_selected()) {
      handleError("add", "421");
    } else {
      handleError("remove", "421");
    }
  };

  const popoverContent = () => {
    const entryContainerStyle = {
      display: "flex",
      flexDirection: "columns",
      gap: "8px",
      alignItems: "baseline"
    };

    return (
      <div>
        <Typography role="text" variant="subtitle2">
          Notes and Augmentations
        </Typography>
        <br />
        <Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <NoteEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
          </Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <NoteQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
          </Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <NoteHalfIcon /> <b>Half</b> - 1/2 of a whole.
          </Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <NoteWholeIcon fontSize="small" style={{ paddingRight: "3px" }} />{" "}
            <b>Whole</b>
          </Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <NoteTripletIcon /> <b>Triplet</b> - the sum of the set equals 1/2
            of a whole.
          </Typography>
          <br />
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <DotIcon fontSize="small" style={{ paddingRight: "5px" }} />{" "}
            <b>Dots</b> - extend its note's duration by 1/2 that note's value.
          </Typography>
          <Typography
            role="text"
            tabIndex={0}
            variant="caption"
            style={entryContainerStyle}
          >
            <TieIcon /> <b>Ties</b> - connect two notes of the same pitch to
            create one duration.
          </Typography>
          <br />
          <Typography 
            variant="caption" 
            style={{...entryContainerStyle, ...{alignItems: "center"}}}
          >
            Check out{" "}
            <TipsAndUpdatesIcon
              fontSize="small"
              color="secondary"
            />
            for more information.
          </Typography>
        </Typography>
      </div>
    );
  };

  const mobileButtonGroupStyle = {
    width: "235px",
    flexWrap: "wrap",
    rowGap: "0.3em",
    marginTop: "0.6em",
  };

  return (
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>
          Note Durations Allowed
        </FormLabel>
        <TooltipPopover content={popoverContent()} label="note durations" />
      </div>
      <ToggleButtonGroup
        onChange={handleSelected}
        color="primary"
        value={selected}
        aria-label="note duration select"
        style={mobile ? mobileButtonGroupStyle : {}}
      >
        <ToggleButton
          value="1/8"
          disabled={isDisabled("1/8")}
          aria-label="eighth"
        >
          <Tooltip
            placement="top"
            disableInteractive
            enterDelay={1500}
            title={
              props.time_signature === "6/8" ? "Type required in 6/8 time." : ""
            }
            arrow
          >
            <NoteEighthIcon fontSize="large" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton
          value="1/4"
          disabled={isDisabled("1/4")}
          aria-label="quarter"
          style={{ width: "59px" }}
        >
          <NoteQuarterIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton
          value="1/2"
          disabled={isDisabled("1/2")}
          aria-label="half"
        >
          <NoteHalfIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton
          value="1"
          disabled={isDisabled("1")}
          size="large"
          aria-label="whole"
          style={
            mobile
              ? {
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                  width: "59px",
                }
              : {}
          }
        >
          <NoteWholeIcon />
        </ToggleButton>
        <ToggleButton
          value="triplet"
          disabled={isDisabled("triplet")}
          aria-label="triplet"
          style={
            mobile
              ? {
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                }
              : {}
          }
        >
          <NoteTripletIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton
          value="dot"
          disabled={isDisabled("dot")}
          size="large"
          aria-label="dot"
          style={{ width: "59px" }}
        >
          <DotIcon />
        </ToggleButton>
        <ToggleButton value="tie" disabled={isDisabled("tie")} aria-label="tie">
          <TieIcon fontSize="large" />
        </ToggleButton>
      </ToggleButtonGroup>

      {!validate() && (
        <FormHelperText
          error
          role="alert"
          aria-live="assertive"
          style={{
            maxWidth: "400px",
          }}
        >
          {errorMessage()}
        </FormHelperText>
      )}
    </div>
  );
};

export default FormNoteDurations;
