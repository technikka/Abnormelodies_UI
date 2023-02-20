import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText
} from "@mui/material";

const FormNoteDurations = (props) => {
  const isChecked = (duration) => {
    return props.note_durations[duration] === true;
  };

  const getTitle = (type) => {
    if (props.time_signature === "6/8") {
      if (type === "1/8") {
        return "note type required in 6/8 time."
      }
      if (type === "1") {
        return "note type not allowed in 6/8 time."
      }
    }
    return type
  }

  const isDisabled = (type) => {
    if (props.time_signature === "6/8" && type === "1") {
      return true
    }
    if (props.time_signature === "3/4" && type === "1") {
      return true
    }
    return false
  }

  const validate = () => {

  }

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <FormLabel>Note Durations To Allow</FormLabel>
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormControlLabel control={
              <Checkbox 
              name="1"
              disabled={isDisabled("1")}
              checked={isChecked("1")} 
              title={getTitle("1")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Whole"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/2"
              disabled={isDisabled("1/2")}
              checked={isChecked("1/2")} 
              title={getTitle("1/2")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Half"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/4"
              disabled={isDisabled("1/4")}
              checked={isChecked("1/4")} 
              title={getTitle("1/4")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Quarter"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/8"
              disabled={isDisabled("1/8")}
              checked={isChecked("1/8")} 
              title={getTitle("1/8")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Eighth"/>

            <FormControlLabel control={
              <Checkbox 
              name="triplet"
              disabled={isDisabled("triplet")}
              checked={isChecked("triplet")} 
              title={getTitle("triplet")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Triplet"/>

            <FormControlLabel control={
              <Checkbox 
              name="dot"
              disabled={isDisabled("dot")}
              checked={isChecked("dot")} 
              title={getTitle("dot")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Dot"/>

            <FormControlLabel control={
              <Checkbox 
              name="tie"
              disabled={isDisabled("tie")}
              checked={isChecked("tie")} 
              title={getTitle("tie")} 
              onChange={props.handleNoteDurationsChange} />
            } label="Tie"/>
          </FormGroup>
        </Grid>
      </Grid>
      {/* { !validate() && 
        <FormHelperText error>
          Error
        </FormHelperText> } */}
    </div>
  );
};

export default FormNoteDurations;
