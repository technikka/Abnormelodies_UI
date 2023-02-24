import {forwardRef} from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TooltipIcon = forwardRef((props, ref) => {
  const style = {
    // color: "#bf3469",
    color: "#185d55",
    width: "0.7em",
  };

  return <HelpOutlineIcon sx={style} ref={ref} {...props}/>;
});

export default TooltipIcon;
