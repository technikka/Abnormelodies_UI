import { Switch } from "@mui/material";

const SwitchCustom = (props) => {
  const switchTrackColor = "secondary.main";
  const switchThumbColor = "primary.main";

  const style = {
    "& .MuiSwitch-track": {
      backgroundColor: switchTrackColor,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: switchTrackColor,
    },
    "& .Mui-checked .MuiSwitch-thumb": {
      backgroundColor: switchThumbColor,
    },
  };

  return <Switch sx={style} {...props} />;
};

export default SwitchCustom;
