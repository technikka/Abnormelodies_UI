import TooltipIcon from "../icons/TooltipIcon";
import { createRef } from "react";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Tooltip,
} from "@mui/material";

const FormRules = (props) => {
  const ref = createRef();

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
            <Tooltip
              title="When selected: longer durations will be preferred near the end of the melody to create a less abrubt finish."
              placement="bottom-end"
              disableInteractive
              arrow
            >
              <TooltipIcon ref={ref} />
            </Tooltip>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormRules;
