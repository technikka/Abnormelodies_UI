import {
  Grid,
  FormLabel,
  Slider
} from "@mui/material";

const FormMeasures = (props) => {
  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormLabel>Measures</FormLabel>
        </Grid>

          <Grid item>
            <Slider
              value={Number(props.num_measures)}
              onChange={props.handleNumMeasuresChange}
              marks
              min={props.minMeasures}
              max={props.maxMeasures}
              step={1}
              valueLabelDisplay="auto"
              style={{width: "300px"}}
            />
          </Grid>
      </Grid>
    </div>
  );
};

export default FormMeasures;
