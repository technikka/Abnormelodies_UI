import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";

const FormTimeSignature = (props) => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <FormLabel>Time Signature</FormLabel>
        </Grid>

        <Grid item>
          <FormControl>
            <RadioGroup
              value={props.time_signature}
              onChange={props.handleTimeSignatureChange}
              row="true"
            >
              <FormControlLabel value="4/4" control={<Radio />} label="4/4" labelPlacement="top" />
              <FormControlLabel value="3/4" control={<Radio />} label="3/4" labelPlacement="top" />
              <FormControlLabel value="6/8" control={<Radio />} label="6/8" labelPlacement="top"/>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormTimeSignature;
