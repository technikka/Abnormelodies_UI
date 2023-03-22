import SliderCustom from "../components/SliderCustom";
import TooltipPopover from "../components/TooltipPopover";
import {
  FormLabel,
  Grid
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
          <TooltipPopover content="
            Tempo: changes the speed of playback. If a melody is playing, restart it to execute the change.
          "/>
        </Grid>

        <Grid item>
          <SliderCustom
            name="tempo"
            value={props.tempoFactor}
            min={tempoMin}
            max={tempoMax}
            step={null}
            marks={sliderMarks}
            onChange={props.handleTempoChange}
            style={{width: "230px"}}
          />
        </Grid>
    </Grid>
    </div>
  );
};

export default MelodyAudioTempo;
