import {
  Slider,
  FormLabel,
  Grid
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const tempoMin = 250;
  const tempoMax = 450;


  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormLabel>Tempo</FormLabel>
        </Grid>

        <Grid item>
          <Slider
            name="tempo"
            value={props.tempoFactor}
            min={tempoMin}
            max={tempoMax}
            step={50}
            marks
            onChange={props.handleTempoChange}
            style={{width: "200px"}}
          />
        </Grid>
    </Grid>
      
    </div>
  );
};

export default MelodyAudioTempo;
