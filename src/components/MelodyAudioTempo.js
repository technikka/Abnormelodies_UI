import SliderCustom from "../components/SliderCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
  FormLabel,
  Typography,
  IconButton,
} from "@mui/material";

const MelodyAudioTempo = (props) => {
  const theme = useTheme();

  // returns true if match found
  const small = useMediaQuery(theme.breakpoints.small);
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption" role="text">
          <b>Tempo:</b> changes the speed of playback. If a melody is playing, restart it to execute the change.
        </Typography>
      </div>
    );
  };

  const displayValue = () => {
    return (
      (props.currentTempo / 50) - 4
    )
  };

  const sliderStyle = {
    width: "130px"
  }

  return (
    <div style={theme.audioControlStyle}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridGap: "10px",
        placeItems: "center"
      }}>
      <IconButton 
        onClick={props.decreaseTempo} 
        aria-label="decrease tempo" 
        color="primary">
          <RemoveIcon fontSize="small"/>
      </IconButton>

        { !small &&
          <SliderCustom
            name="tempo"
            value={props.currentTempo}
            min={props.tempoMin}
            max={props.tempoMax}
            step={props.tempoStep}
            marks
            onChange={props.handleTempoChange}
            style={sliderStyle}
            aria-label="tempo"
          />
        }

        { small &&
          <div style={{
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "4px",
            padding: "0.6em",
            backgroundColor: "#f7f7f7",
            // fontWeight: "500"
          }}
            aria-label="tempo display"
          >
            { displayValue() }
          </div>
        }
        
        <IconButton 
          onClick={props.increaseTempo} 
          aria-label="increase tempo" 
          color="primary">
            <AddIcon fontSize="small"/>
        </IconButton>
      </div>

      <div style={
        mobile ? theme.mobileAudioLabelContainerStyle : theme.audioControlLabelContainerStyle
        }>
        <FormLabel style={theme.itemLabelStyle}>Tempo</FormLabel>
        <TooltipPopover 
          content={popoverContent()} 
          label="tempo" 
          style={mobile ? {padding: "0"} : {}}
        />
      </div>

    </div>
  );
};

export default MelodyAudioTempo;
