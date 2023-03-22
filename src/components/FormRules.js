import TooltipPopover from "../components/TooltipPopover";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@mui/material";

const FormRules = (props) => {
  const boxColor = "secondary";

  const isChecked = (rule) => {
    return props.rules[rule] === true;
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <FormLabel>Additional Features</FormLabel>
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="smooth_resolve"
                  checked={isChecked("smooth_resolve")}
                  onChange={props.handleRulesChange}
                  color={boxColor} 
                />
              }
              label="Smooth Resolve"
            />
            <TooltipPopover content="
              Smooth Resolve: when selected, longer durations will be preferred near the end of the melody to create a less abrubt finish.
            "/>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormRules;
