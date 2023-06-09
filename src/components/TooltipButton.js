import { IconButton } from "@mui/material";
import TooltipIcon from "../icons/TooltipIcon";

const TooltipButton = (props) => {
  return (
    <IconButton
      aria-label={props.label + "tool tip"}
      color="tertiary"
      onClick={props.onClick}
      style={props.style}
    >
      <TooltipIcon />
    </IconButton>
  );
};

export default TooltipButton;
