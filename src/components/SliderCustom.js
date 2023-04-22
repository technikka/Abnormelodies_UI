import { Slider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";

const SliderCustom = (props) => {
  const theme = useTheme();
  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const sliderTrackColor = "primary.main"
  const sliderThumbColor = "secondary.main"
  const sliderBoxShadow = "0px 0px 0px 8px rgba(189, 146, 2, 0.16)"

  const style = { 
    width: "300px",
    "& .MuiSlider-thumb": { 
      backgroundColor: sliderThumbColor 
    },
    "& .MuiSlider-thumb:hover": {
      color: sliderThumbColor,
      boxShadow: sliderBoxShadow
    },
    "& .MuiSlider-track": {
      backgroundColor: sliderTrackColor
    }
  }

  const mobileStyle = {
    width: "265px",
  }

  return (
    <Slider
      sx={mobile ? {...style, ...mobileStyle} : style} 
      {...props}
    />
  )
}

export default SliderCustom