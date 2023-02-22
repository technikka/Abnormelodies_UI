import SliderCustom from "../components/SliderCustom";
import {
  Grid,
  FormLabel
} from "@mui/material";

const FormMeasures = (props) => {

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormLabel>Measures</FormLabel>
        </Grid>

          <Grid item>
            <SliderCustom 
              value={Number(props.num_measures)}
              onChange={props.handleNumMeasuresChange}
              marks
              min={props.minMeasures}
              max={props.maxMeasures}
              step={1}
              valueLabelDisplay="auto"
            />
          </Grid>
      </Grid>
    </div>
  );
};

export default FormMeasures;
