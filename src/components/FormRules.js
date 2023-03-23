import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import {
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";

const FormRules = (props) => {
  const theme = useTheme();
  const boxColor = "secondary";

  const isChecked = (rule) => {
    return props.rules[rule] === true;
  };

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption">
          <b>Smooth Resolve:</b> when selected, longer durations will be
          preferred near the end of the melody to create a less abrubt finish.
        </Typography>
      </div>
    );
  };

  return (
    <div className="rules-container" style={theme.gridContainerStyle}>
      <div style={theme.itemContainerStyle}>
        <FormLabel>Additional Features</FormLabel>
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
          <TooltipPopover content={popoverContent()} />
        </FormGroup>
      </div>
    </div>
  );
};

export default FormRules;
