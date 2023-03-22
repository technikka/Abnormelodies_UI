import {forwardRef} from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTheme } from '@mui/material/styles';

const TooltipIcon = forwardRef((props, ref) => {
  const theme = useTheme();

  const style = {
    color: theme.palette.primary.main,
    width: "0.7em",
  };

  return <HelpOutlineIcon sx={style} ref={ref} {...props}/>;
});

export default TooltipIcon;
