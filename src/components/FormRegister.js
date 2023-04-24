import { useState } from "react";
import uniqid from "uniqid";
import {majorTonics, minorTonics, errorData, getScale } from "../Data";
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  FormHelperText,
  InputLabel
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
    const index = octaveValues.indexOf(props.octave_start)
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
        return
      } else {
        setErrors(errors.concat(code));
        props.handleErrors("add", code);
      }
    }

    if (action === "remove") {
      if (errors.includes(code)) {
        setErrors(
          errors.filter((error) => {return error !== code})
        )
        props.handleErrors("remove", code)
      } else {
        return
      }
    } 
  }

  const errorMessage = () => {
    let entry = errorData.find((error) => error.code === errors[0])
    if (entry) {
      return entry.message
    }
  }

  const validate = () => {
    let notes;
    if (props.scale === "major") {
      notes = majorTonics
    } else {
      notes = minorTonics;
    }
    if (props.octave_start === props.octave_end &&
        notes.indexOf(props.note_start) > notes.indexOf(props.note_end)
      ) {
        handleError("add", "123")
        return false
    } else {
      handleError("remove", "123")
    }
    return true
  }

  return (
    <div style={{...theme.itemContainerStyle,...{width: "270px"}}}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Register</FormLabel>
      </div>
      
      <div style={{display: "grid", gridTemplateColumns: "auto auto auto", alignItems: "center", columnGap: "5px"}}>
        <div>
          <FormControl sx={{my:0.5}} size="small">
            <InputLabel id="note-start" style={{opacity: "0"}}>Note Start</InputLabel>
            <Select
              labelId="note-start"
              value={props.note_start}
              onChange={props.handleNoteStartChange}
              error={!validate()}
              variant="filled"
              sx={{borderTopRightRadius: 0, "& .MuiSelect-filled": {padding: "10px"}}}
            >
            {tonicOptions()}
            </Select>
          </FormControl>
      
          <FormControl sx={{my:0.5}} size="small">
            <InputLabel id="octave-start" style={{opacity: "0"}}>Octave Start</InputLabel>
            <Select
              labelId="octave-start"
              value={props.octave_start}
              onChange={props.handleOctaveStartChange}
              error={!validate()}
              variant="filled"
              sx={{borderTopLeftRadius: 0, "& .MuiSelect-filled": {padding: "10px"}}}
            >
            {octaveStartOptions()}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormHelperText role="text" >To</FormHelperText>
        </div>
      
        <div>
          <FormControl sx={{my:0.5}} size="small">
            <InputLabel id="note-end" style={{opacity: "0"}}>Note End</InputLabel>
            <Select
              labelId="note-end"
              value={props.note_end}
              onChange={props.handleNoteEndChange}
              error={!validate()}
              variant="filled"
              sx={{borderTopRightRadius: 0, "& .MuiSelect-filled": {padding: "10px"}}}
            >
            {tonicOptions()}
            </Select>
          </FormControl>
          <FormControl sx={{my:0.5}} size="small">
            <InputLabel id="octave-end" style={{opacity: "0"}}>Octave End</InputLabel>
            <Select
                labelId="octave-end"
              value={props.octave_end}
              onChange={props.handleOctaveEndChange}
              error={!validate()}
              variant="filled"
              sx={{borderTopLeftRadius: 0, "& .MuiSelect-filled": {padding: "10px"}}}
            >
            {octaveEndOptions()}
            </Select>
          </FormControl>
        </div>
      </div>
      {!validate() &&
        <FormHelperText role="alert" aria-live="assertive" error 
        style={{
          maxWidth: "252px",
        }}
      >
        {errorMessage()}
      </FormHelperText>
      }
    </div>
  );
};

export default FormRegister;