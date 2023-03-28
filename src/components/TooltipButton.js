import { IconButton } from "@mui/material";
import TooltipIcon from '../icons/TooltipIcon'

const TooltipButton = (props) => {

  const style = {
    minHeight: "0", 
    minWidth: "0", 
    padding: "0 0 0 8px"
  }

  return (
    <IconButton style={style} aria-label={props.label + "tool tip"} color="primary" onClick={props.onClick}>
      <TooltipIcon />
    </IconButton>
  )

};

export default TooltipButton