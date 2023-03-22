import { useState } from "react";
import { Popover, Typography } from "@mui/material";
import TooltipButton from "./TooltipButton";

const TooltipPopover = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TooltipButton onClick={handleOpen} />
      <Popover
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{props.content}</Typography>
      </Popover>
    </div>
  );
};

export default TooltipPopover;
