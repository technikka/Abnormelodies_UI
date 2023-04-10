import { useState } from "react";
import { Popover, Typography } from "@mui/material";
import TooltipButton from "./TooltipButton";
import { useTheme } from '@mui/material/styles';

const TooltipPopover = (props) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  const popoverStyle = {
    "& .MuiPopover-paper": { 
      backgroundColor: "#fbf0cc",
      border: "1px solid #f7f7f7",
      maxWidth: "405px",
      height: "max-content",
      padding: "10px"
    },
  }

  return (
    <div>
      <TooltipButton onClick={handleClick} label={props.label}/>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        sx={popoverStyle}
      >
        <Typography variant="caption">{props.content}</Typography>
      </Popover>
    </div>
  );
};

export default TooltipPopover;
