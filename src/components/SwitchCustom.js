import { Switch } from "@mui/material";

const SwitchCustom = (props) => {
  const switchTrackColor = "secondary.main";
  const switchThumbColor = "primary.main";
  const switchBoxShadow = "0px 0px 0px 8px rgba(189, 146, 2, 0.16)";

  const style = {
    "& .MuiSwitch-track": {
      backgroundColor: switchTrackColor
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: switchTrackColor 
    },
    "& .Mui-checked .MuiSwitch-thumb": {
      backgroundColor: switchThumbColor
    },
    // "& .MuiSwitch-thumb:hover": {
    //   color: switchThumbColor,
    //   boxShadow: switchBoxShadow
    // }
  }

  return (
    <Switch 
      sx={style}
      {...props}
    />
  )

}

export default SwitchCustom