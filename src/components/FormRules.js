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
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Additional Options</FormLabel>
        <TooltipPopover content={popoverContent()} label="additional options" />
      </div>
      <div style={theme.itemControlStyle}>
        <FormGroup row style={{width: "max-content", alignSelf: "start"}}>
          <FormControlLabel
            control={
              <Checkbox
                name="smooth_resolve"
                checked={isChecked("smooth_resolve")}
                onChange={props.handleRulesChange}
                color={boxColor}
              />
            }
            label={
              <Typography variant="body2">Smooth Resolve
              </Typography>
            }
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default FormRules;
