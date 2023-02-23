import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import FormRestDurationsModal from "../components/FormRestDurationsModal";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@mui/material";

const FormRestDurations = (props) => {
  const boxColor = "secondary";

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
          <FormRestDurationsModal />
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormControlLabel control={
              <Checkbox 
              name="1/8"
              disabled={isDisabled("1/8")}
              checked={isChecked("1/8")}  
              onChange={props.handleRestDurationsChange}
              color={boxColor}  />
            } label={<RestEighthIcon />}/>

            <FormControlLabel control={
              <Checkbox 
              name="1/4"
              disabled={isDisabled("1/4")}
              checked={isChecked("1/4")}  
              onChange={props.handleRestDurationsChange}
              color={boxColor}  />
            } label={<RestQuarterIcon />}/>

            <FormControlLabel control={
              <Checkbox 
              name="1/2"
              disabled={isDisabled("1/2")}
              checked={isChecked("1/2")} 
              onChange={props.handleRestDurationsChange}
              color={boxColor}  />
            } label={<RestHalfIcon />}/>

            <FormControlLabel control={
              <Checkbox
              name="1"
              disabled={isDisabled("1")}
              checked={isChecked("1")} 
              onChange={props.handleRestDurationsChange}
              color={boxColor}  />
            } label={<RestWholeIcon />}/>

            
          </FormGroup>
        </Grid>
      </Grid>
    </div> 
  );
};

export default FormRestDurations;
