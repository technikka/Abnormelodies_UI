import { useState } from "react";
import { Popover, Typography } from "@mui/material";
import TooltipButton from "./TooltipButton";

const TooltipPopover = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const popoverStyle = {
    "& .MuiPopover-paper": { 
      backgroundColor: "#fdf8e6",
      width: "400px",
      height: "max-content",
      padding: "5px"
    },
  }

  return (
    <div>
      <TooltipButton onClick={handleOpen} />
      <Popover
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 400 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={popoverStyle}
      >
        <Typography variant="caption">{props.content}</Typography>
      </Popover>
    </div>
  );
};

export default TooltipPopover;
