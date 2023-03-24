import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const FormTimeSignature = (props) => {
  const theme = useTheme();

  return (
    <div className="time-sig-container" style={theme.gridContainerStyle}>

      <div style={theme.itemContainerStyle}>

        <div style={theme.itemLabelContainerStyle}>
          <FormLabel>Time Signature</FormLabel>
        </div>

        <div>
          <FormControl>
            <ToggleButtonGroup
              value={props.time_signature}
              onChange={props.handleTimeSignatureChange}
              size="large"
              color="primary"
              exclusive
            >
              <ToggleButton value="3/4">
                <ThreeFourIcon fontSize="large"/>
              </ToggleButton>
              <ToggleButton value="4/4">
                <FourFourIcon fontSize="large"/>
              </ToggleButton>
              <ToggleButton value="6/8">
                <SixEightIcon fontSize="large"/>
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default FormTimeSignature;
