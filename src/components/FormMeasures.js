import SliderCustom from "../components/SliderCustom";
import { useTheme } from '@mui/material/styles';
import {
  FormLabel
} from "@mui/material";

const FormMeasures = (props) => {
  const theme = useTheme();

  return (
    <div className="measures-container" style={theme.gridContainerStyle}>

      <div style={theme.itemContainerStyle}>

        <div style={theme.itemLabelContainerStyle}>
          <FormLabel>Measures</FormLabel>
        </div>

        <div>
          <SliderCustom
            value={Number(props.num_measures)}
            onChange={props.handleNumMeasuresChange}
            marks
            min={props.minMeasures}
            max={props.maxMeasures}
            step={1}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FormMeasures;
