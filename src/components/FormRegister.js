import { useState } from "react";
import uniqid from "uniqid";
import { errorData, getScale } from "../Data";
import { useTheme } from "@mui/material/styles";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TooltipPopover from "../components/TooltipPopover";
import {
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  FormHelperText,
  InputLabel,
  Typography
} from "@mui/material";

const FormRegister = (props) => {
  const theme = useTheme();
  const [errors, setErrors] = useState([]);
  const octaveValues = ["1", "2", "3", "4", "5", "6", "7"];

  const tonicOptions = () => {
    return getScale(props.tonic, props.scale).map((tonic) => {
      return (
        <MenuItem key={uniqid()} value={tonic}>
          {props.formatTonicString(tonic)}
        </MenuItem>
      );
    });
  };

  const octaveStartOptions = () => {
    return octaveValues.map((value) => {
      return (
        <MenuItem key={uniqid()} value={value}>
          {value}
        </MenuItem>
      );
    });
  };

  const octaveEndOptions = () => {
    const index = octaveValues.indexOf(props.octave_start);
    return octaveValues.slice(index).map((value) => {
      return (
        <MenuItem key={uniqid()} value={value}>
          {value}
        </MenuItem>
      );
    });
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

  const validate = () => {
    const order = ["C", "D", "E", "F", "G", "A", "B"];
    const note_start_index = order.indexOf(props.note_start[0]);
    const note_end_index = order.indexOf(props.note_end[0]);
    if (
      props.octave_start === props.octave_end &&
      note_start_index > note_end_index 
    ) {
      handleError("add", "123");
      return false;
    } else {
      handleError("remove", "123");
    }
    return true;
  };

  const popoverContent = () => {
    return (
      <div>
        <Typography 
          role="text" 
          variant="caption" 
          style={{
            display: "grid", 
            gridGap: "10px"
          }}>
          <span><b>Register</b> designation is based on the layout of a piano. The letter indicates the pitch and the number indicates the octave.</span>

          <span>C4 (middle C) is in the middle of the piano with lower octaves to the left of it, and higher octaves to the right of it.</span>

          <div style={{display: "flex", flexDirection: "columns", alignItems: "center", paddingTop: "10px" }}>
          Check out{" "}
            <TipsAndUpdatesIcon
              fontSize="small"
              color="secondary"
              style={{ padding: "0 5px"}}
            />
            for more information.
          </div>
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ ...theme.itemContainerStyle, ...{ width: "270px" } }}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Register</FormLabel>
        <TooltipPopover 
          content={popoverContent()} 
          label="register" 
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <div>
          <FormControl sx={{ my: 0.5 }} size="small">
            <InputLabel id="note-start" style={{ opacity: "0" }}>
              Note Start
            </InputLabel>
            <Select
              labelId="note-start"
              value={props.note_start}
              onChange={props.handleNoteStartChange}
              error={!validate()}
              variant="filled"
              sx={{
                borderTopRightRadius: 0,
                "& .MuiSelect-filled": { padding: "10px" },
              }}
            >
              {tonicOptions()}
            </Select>
          </FormControl>

          <FormControl sx={{ my: 0.5 }} size="small">
            <InputLabel id="octave-start" style={{ opacity: "0" }}>
              Octave Start
            </InputLabel>
            <Select
              labelId="octave-start"
              value={props.octave_start}
              onChange={props.handleOctaveStartChange}
              error={!validate()}
              variant="filled"
              sx={{
                borderTopLeftRadius: 0,
                "& .MuiSelect-filled": { padding: "10px" },
              }}
            >
              {octaveStartOptions()}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormHelperText role="text">To</FormHelperText>
        </div>

        <div>
          <FormControl sx={{ my: 0.5 }} size="small">
            <InputLabel id="note-end" style={{ opacity: "0" }}>
              Note End
            </InputLabel>
            <Select
              labelId="note-end"
              value={props.note_end}
              onChange={props.handleNoteEndChange}
              error={!validate()}
              variant="filled"
              sx={{
                borderTopRightRadius: 0,
                "& .MuiSelect-filled": { padding: "10px" },
              }}
            >
              {tonicOptions()}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 0.5 }} size="small">
            <InputLabel id="octave-end" style={{ opacity: "0" }}>
              Octave End
            </InputLabel>
            <Select
              labelId="octave-end"
              value={props.octave_end}
              onChange={props.handleOctaveEndChange}
              error={!validate()}
              variant="filled"
              sx={{
                borderTopLeftRadius: 0,
                "& .MuiSelect-filled": { padding: "10px" },
              }}
            >
              {octaveEndOptions()}
            </Select>
          </FormControl>
        </div>
      </div>
      {!validate() && (
        <FormHelperText
          role="alert"
          aria-live="assertive"
          error
          style={{
            maxWidth: "252px",
          }}
        >
          {errorMessage()}
        </FormHelperText>
      )}
    </div>
  );
};

export default FormRegister;
