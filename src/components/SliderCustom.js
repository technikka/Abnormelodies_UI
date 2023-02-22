import { Slider } from "@mui/material";

const SliderCustom = (props) => {
  const sliderTrackColor = "primary.main"
  const sliderThumbColor = "secondary.main"
  const sliderBoxShadow = "0px 0px 0px 8px rgba(189, 146, 2, 0.16)"
  // box-shadow yellow:
  // "0px 0px 0px 8px rgba(236, 182, 2, 0.16)"
  // yellow but darker shade
  // "0px 0px 0px 8px rgba(189, 146, 2, 0.16)"

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

  return (
    <Slider
      sx={style} 
      {...props}
    />
  )
}

export default SliderCustom