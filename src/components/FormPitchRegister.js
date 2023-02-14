import uniqid from "uniqid";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  FormHelperText,
  FormGroup
} from "@mui/material";

const FormPitchRegister = (props) => {
  const octaveValues = ["1", "2", "3", "4", "5", "6", "7"];

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

  return (
    <div>
      <Grid container spacing={0} alignItems="center">
        <Grid item>
          <FormLabel>Register</FormLabel>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1 }} size="small">
            <Select
              value={props.note_start}
              onChange={props.handleNoteStartChange}
            >
            {props.tonicOptions()}
            </Select>
          </FormControl>
        
          <FormControl sx={{ m: 1 }} size="small">
            <Select
              value={props.octave_start}
              onChange={props.handleOctaveStartChange}
            >
            {octaveStartOptions()}
            </Select>
          </FormControl>
        </Grid>

        <FormHelperText>To</FormHelperText>

        <Grid item>
          <FormControl sx={{ m: 1 }} size="small">
            <Select
              value={props.note_end}
              onChange={props.handleNoteEndChange}
            >
            {props.tonicOptions()}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }} size="small">
            <Select
              value={props.octave_end}
              onChange={props.handleOctaveEndChange}
            >
            {octaveEndOptions()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormPitchRegister;
