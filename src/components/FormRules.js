import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Tooltip,
} from "@mui/material";

const FormRules = (props) => {
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
              <QuestionMarkIcon fontSize="30px" />
            </Tooltip>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormRules;
