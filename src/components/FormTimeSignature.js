import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const FormTimeSignature = (props) => {
  const theme = useTheme();

  return (
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Time Signature</FormLabel>
      </div>
      <div style={theme.itemControlStyle}>
        <FormControl>
          <ToggleButtonGroup
            value={props.time_signature}
            onChange={props.handleTimeSignatureChange}
            color="primary"
            exclusive
            aria-label="time signature"
          >
            <ToggleButton value="3/4" aria-label="three four">
              <ThreeFourIcon fontSize="large" />
            </ToggleButton>
            <ToggleButton value="4/4" aria-label="four four">
              <FourFourIcon fontSize="large" />
            </ToggleButton>
            <ToggleButton value="6/8" aria-label="six eight">
              <SixEightIcon fontSize="large" />
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default FormTimeSignature;
