import { useState } from "react";
import { Popover, Typography } from "@mui/material";
import TooltipButton from "./TooltipButton";

const TooltipPopover = (props) => {
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
      backgroundColor: "#fdf8e6",
      width: "400px",
      height: "max-content",
      padding: "5px"
    },
  }

  return (
    <div style={{width: "min-content", display: "inline-block"}}>
      <TooltipButton onClick={handleClick} />
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
