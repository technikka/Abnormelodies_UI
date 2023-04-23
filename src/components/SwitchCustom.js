import { Switch } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SwitchCustom = (props) => {
  // const theme = useTheme();

  // // returns true if match found
  // const mobile = useMediaQuery(theme.breakpoints.mobile);

  const switchTrackColor = "secondary.main";
  const switchThumbColor = "primary.main";

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
  }

  return (
    <Switch 
      sx={style}
      {...props}
    />
  )

}

export default SwitchCustom