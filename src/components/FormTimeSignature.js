import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import {
  Grid,
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
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
            <ToggleButtonGroup
              value={props.time_signature}
              onChange={props.handleTimeSignatureChange}
              size="large"
              color="primary"
              exclusive
            >
              <ToggleButton value="4/4">
                <FourFourIcon fontSize="large"/>
              </ToggleButton>

              <ToggleButton value="3/4">
                <ThreeFourIcon fontSize="large"/>
              </ToggleButton>

              <ToggleButton value="6/8">
                <SixEightIcon fontSize="large"/>
              </ToggleButton>

            </ToggleButtonGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormTimeSignature;
