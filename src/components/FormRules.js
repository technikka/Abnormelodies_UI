import {
  Grid,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
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
            <FormControlLabel control={
              <Checkbox 
              name="smooth_resolve"
              checked={isChecked("smooth_resolve")}
              onChange={props.handleRulesChange}/>
            } label="Smooth Resolve"/>

          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormRules;
