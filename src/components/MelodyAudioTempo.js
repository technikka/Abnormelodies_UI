import SliderCustom from "../components/SliderCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import { 
  FormLabel, 
  Grid, 
  Typography 
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const theme = useTheme();
  const tempoMin = 250;
  const tempoMax = 450;

  const sliderMarks = [
    { value: 250, label: "- -" },
    { value: 300, label: "-" },
    { value: 350, label: "|" },
    { value: 400, label: "+" },
    { value: 450, label: "++" },
  ];

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption">
          <b>Tempo:</b> changes the speed of playback. If a melody is playing,
          restart it to execute the change.
        </Typography>
      </div>
    );
  };

  return (
    <div style={theme.itemContainerStyle}>

      <div style={theme.itemLabelContainerStyle}>
        <FormLabel>Tempo</FormLabel>
        <TooltipPopover content={popoverContent()} />
      </div>

      <SliderCustom
        name="tempo"
        value={props.tempoFactor}
        min={tempoMin}
        max={tempoMax}
        step={null}
        marks={sliderMarks}
        onChange={props.handleTempoChange}
        style={{ width: "230px" }}
      />

    </div>
  );
};

export default MelodyAudioTempo;
