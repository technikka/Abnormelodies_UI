import { useState, useEffect } from "react";
import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import TooltipPopover from "../components/TooltipPopover";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useTheme } from "@mui/material/styles";
import {
  FormLabel,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const FormRestDurations = (props) => {
  const theme = useTheme();

  const selectedDurations = () => {
    return Object.keys(props.rest_durations).filter(
      (value) => props.rest_durations[value] === true
    );
  };

  const [selected, setSelected] = useState(selectedDurations);

  const handleSelected = (event, selected) => {
    setSelected(selected);
    props.handleRestDurationsChange(event);
  };

  useEffect(() => {
    setSelected(selectedDurations());
  }, [props.rest_durations]);

  const isDisabled = (type) => {
    if (props.time_signature === "6/8" && type === "1") {
      return true;
    }
    if (props.time_signature === "3/4" && type === "1") {
      return true;
    }
    return false;
  };

  const popoverContent = () => {
    const entryContainerStyle = {
      display: "flex", 
      flexDirection: "columns",
      gap: "8px", 
      alignItems: "center",
      width: "max-content",
      padding: "5px 0 0 0" 
    }

    return (
      <div>
        <Typography variant={"subtitle2"}>Rests</Typography>
        <br />
        <Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <RestEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <RestQuarterIcon style={{marginLeft: "-2px"}}/> <b>Quarter</b> - 1/4 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <RestHalfIcon /> <b>Half</b> - 1/2 of a whole.
          </Typography>
          <Typography variant="caption" style={entryContainerStyle}>
            <RestWholeIcon /> <b>Whole</b>
          </Typography>
          <br />
          <Typography variant="caption" style={entryContainerStyle}>
            Check out <TipsAndUpdatesIcon fontSize="small" color="secondary" />{" "}
            for more detailed information.
          </Typography>
        </Typography>
      </div>
    );
  };

  return (
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Rest Durations Allowed</FormLabel>
        <TooltipPopover content={popoverContent()} label="Rest Durations" />
      </div>
      <ToggleButtonGroup
        onChange={handleSelected}
        color="primary"
        value={selected}
        size="large"
        aria-label="rest duration select"
      >
        <ToggleButton value="1/8" disabled={isDisabled("1/8")} aria-label="eighth">
          <RestEighthIcon />
        </ToggleButton>
        <ToggleButton value="1/4" disabled={isDisabled("1/4")} aria-label="quarter">
          <RestQuarterIcon />
        </ToggleButton>
        <ToggleButton value="1/2" disabled={isDisabled("1/2")} aria-label="half">
          <RestHalfIcon />
        </ToggleButton>
        <ToggleButton value="1" disabled={isDisabled("1")} aria-label="whole">
          <RestWholeIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default FormRestDurations;
