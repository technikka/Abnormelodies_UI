import SliderCustom from "../components/SliderCustom";
import { useTheme } from "@mui/material/styles";
import { FormLabel } from "@mui/material";

const FormMeasures = (props) => {
  const theme = useTheme();

  const createSliderMarks = () => {
    let marks = [];
    let label;
    for (let i = props.minMeasures; i <= props.maxMeasures; i++) {
      if (i === props.minMeasures || i === props.maxMeasures) {
        label = i;
      } else {
        label = "";
      }
      marks.push({ value: i, label: label });
    }
    return marks;
  };

  return (
    <div style={theme.itemContainerStyle}>
      <div style={theme.itemLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Measures</FormLabel>
      </div>
      <div>
        <SliderCustom
          value={Number(props.num_measures)}
          onChange={props.handleNumMeasuresChange}
          marks={createSliderMarks()}
          min={props.minMeasures}
          max={props.maxMeasures}
          step={1}
          valueLabelDisplay="auto"
          aria-label="measures"
        />
      </div>
    </div>
  );
};

export default FormMeasures;
