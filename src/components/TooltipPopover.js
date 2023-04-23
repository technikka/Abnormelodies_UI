import { useState } from "react";
import { Popover, Typography } from "@mui/material";
import TooltipButton from "./TooltipButton";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TooltipPopover = (props) => {
  const theme = useTheme();
  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(
      event.currentTarget.parentElement.parentElement
    );
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
      padding: "10px",
    },
  }

  const mobilePopoverStyle = {
    "& .MuiPopover-paper": { 
      backgroundColor: "#fbf0cc",
      border: "1px solid #f7f7f7",
      maxWidth: "320px",
      height: "max-content",
      padding: "10px",
    },
  }

  return (
    <div>
      <TooltipButton 
        onClick={handleClick} 
        label={props.label} 
        style={props.style}
      />
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
        sx={mobile ? mobilePopoverStyle : popoverStyle}
      >
        <Typography variant="caption" style={{
          overflowWrap: "break-word"
        }}>
          {props.content}
        </Typography>
      </Popover>
    </div>
  );
};

export default TooltipPopover;
