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
          label={
            <Typography variant="subtitle2">Smooth Resolve
            </Typography>
          }
        />
      </FormGroup>
    </div>
  );
};

export default FormRules;
