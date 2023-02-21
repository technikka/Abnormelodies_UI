import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import {
  Grid,
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  Container,
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
              color="secondary"
              exclusive
            >
              <ToggleButton value="4/4">
                <Container disableGutters>
                  <FourFourIcon fontSize="large"/>
                </Container>
              </ToggleButton>

              <ToggleButton value="3/4">
                <Container disableGutters>
                  <ThreeFourIcon fontSize="large"/>
                </Container>
              </ToggleButton>

              <ToggleButton value="6/8">
                <Container disableGutters>
                  <SixEightIcon fontSize="large"/>
                </Container>
              </ToggleButton>

            </ToggleButtonGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormTimeSignature;
