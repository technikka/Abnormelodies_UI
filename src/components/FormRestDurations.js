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
              checked={isChecked("1")} 
              onChange={props.handleRestDurationsChange} />
            } label="Whole"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/2"
              checked={isChecked("1/2")} 
              onChange={props.handleRestDurationsChange} />
            } label="Half"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/4"
              checked={isChecked("1/4")}  
              onChange={props.handleRestDurationsChange} />
            } label="Quarter"/>

            <FormControlLabel control={
              <Checkbox 
              name="1/8"
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
