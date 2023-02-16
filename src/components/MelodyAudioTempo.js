import {
  Slider,
  FormLabel,
  Grid,
  Tooltip
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const tempoMin = 250;
  const tempoMax = 450;

  const sliderMarks= [
    { value: 250, label: "- -" },
    { value: 300, label: "-" },
    { value: 350, label: "|"},
    { value: 400, label: "+" },
    { value: 450, label: "++"},
  ];


  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormLabel>Tempo</FormLabel>
        </Grid>

        <Grid item>
          <Tooltip title="Change the speed of playback. Restart melody if playing to hear change." placement="right-start" arrow>
            <Slider
              name="tempo"
              value={props.tempoFactor}
              min={tempoMin}
              max={tempoMax}
              step={50}
              marks={sliderMarks}
              onChange={props.handleTempoChange}
              style={{width: "230px"}}
            />
          </Tooltip>
        </Grid>
    </Grid>
    </div>
  );
};

export default MelodyAudioTempo;
