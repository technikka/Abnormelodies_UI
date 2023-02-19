import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@mui/material";

const FormRestDurations = (props) => {
  const isChecked = (duration) => {
    return props.rest_durations[duration] === true;
  };

  const isDisabled = (type) => {
    if (props.time_signature === "6/8" && type === "1") {
      return true
    }
    if (props.time_signature === "3/4" && type === "1") {
      return true
    }
    return false
  }

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <FormLabel>Rest Durations To Allow</FormLabel>
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormControlLabel control={
              <Checkbox 
              name="1"
              disabled={isDisabled("1")}
              checked={isChecked("1")} 
              onChange={props.handleRestDurationsChange} />
            } label="Whole"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/2"
              disabled={isDisabled("1/2")}
              checked={isChecked("1/2")} 
              onChange={props.handleRestDurationsChange} />
            } label="Half"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/4"
              disabled={isDisabled("1/4")}
              checked={isChecked("1/4")}  
              onChange={props.handleRestDurationsChange} />
            } label="Quarter"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/8"
              disabled={isDisabled("1/8")}
              checked={isChecked("1/8")}  
              onChange={props.handleRestDurationsChange} />
            } label="Eighth"/>
          </FormGroup>
        </Grid>
      </Grid>
    </div> 
  );
};

export default FormRestDurations;
