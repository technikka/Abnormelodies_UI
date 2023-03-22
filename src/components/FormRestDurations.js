import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import TooltipPopover from "../components/TooltipPopover";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Typography
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

  const popoverContent = () => {
    return (
      <div>
        <Typography variant={"subtitle2"}>Rests</Typography>
          <br />
          <Typography>
            <Typography variant="caption" style={{display: "block"}}>
              <RestEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
            </Typography>
            <Typography variant="caption" style={{display: "block"}}>
              <RestQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
            </Typography>
            <Typography variant="caption" style={{display: "block"}}>
              <RestHalfIcon /> <b>Half</b> - 1/2 of a whole.
            </Typography>
            <Typography variant="caption" style={{display: "block"}}>
              <RestWholeIcon /> <b>Whole</b>
            </Typography>
            <br />
            <Typography variant="caption" style={{display: "block"}}>
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
          <FormLabel>Rest Durations To Allow</FormLabel>
          <TooltipPopover content={popoverContent()} />
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
