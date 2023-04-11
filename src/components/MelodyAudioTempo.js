import SliderCustom from "../components/SliderCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { 
  FormLabel,
  Typography 
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const theme = useTheme();
  const tempoMin = 250;
  const tempoMax = 450;

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption" role="text">
          <b>Tempo:</b> changes the speed of playback. If a melody is playing, restart it to execute the change.
        </Typography>
      </div>
    );
  };

  return (
    <div style={theme.audioControlStyle}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridGap: "10px",
        placeItems: "center"
      }}>
      <RemoveIcon fontSize="small"/>
        <SliderCustom
          name="tempo"
          value={props.tempoFactor}
          min={tempoMin}
          max={tempoMax}
          step={50}
          marks
          onChange={props.handleTempoChange}
          style={{ width: "130px" }}
          aria-label="tempo"
        />
        <AddIcon fontSize="small"/>
      </div>

      <div style={theme.audioControlLabelContainerStyle}>
        <FormLabel style={theme.itemLabelStyle}>Tempo</FormLabel>
        <TooltipPopover content={popoverContent()} label="tempo"/>
      </div>

    </div>
  );
};

export default MelodyAudioTempo;
