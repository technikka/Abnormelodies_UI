import uniqid from "uniqid";
import FormPitchRegister from "./FormPitchRegister";
import { minorTonics, majorTonics } from "../Data";
import SwitchCustom from "../components/SwitchCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  Typography,
} from "@mui/material";

const FormPitch = (props) => {
  const theme = useTheme();

  const getSymbol = (type) => {
    if (type === "b") {
      return "\u266d";
    }
    return "\u266f";
  };

  const getText = (tonic) => {
    let symbol;
    if (tonic.length === 2) {
      symbol = getSymbol(tonic[1]);
      return tonic[0] + symbol;
    }
    return tonic;
  };

  const tonicOptions = () => {
    if (props.scale === "minor") {
      return minorTonics.map((tonic) => {
        return (
          <MenuItem key={uniqid()} value={tonic}>
            {getText(tonic)}
          </MenuItem>
        );
      });
    }
    return majorTonics.map((tonic) => {
      return (
        <MenuItem key={uniqid()} value={tonic}>
          {getText(tonic)}
        </MenuItem>
      );
    });
  };

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption">
          <b>Sync Tonics of Key and Register:</b> when active, register selection changes to
          match the tonic you select here. You can still change the register
          notes, but they'll sync with the key tonic again if you change it.
        </Typography>
      </div>
    );
  };

  return (
    <div className="pitch-container" style={theme.gridContainerStyle}>

      <div className="key-container" style={theme.itemContainerStyle}>

        <div style={theme.itemLabelContainerStyle}>
          <FormLabel>Key</FormLabel>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", justifyItems: "center", columnGap: "5px"}}>
          <div>
            <FormControl sx={{minWidth: 120 }} size="small">
              <InputLabel id="selected-scale">Scale</InputLabel>
              <Select
                labelId="selected-scale"
                value={props.scale}
                onChange={props.handleScaleChange}
                label="Mode"
              >
                <MenuItem value={"major"}>Major</MenuItem>
                <MenuItem value={"minor"}>Minor</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl sx={{minWidth: 120 }} size="small">
              <InputLabel id="selected-tonic">Tonic</InputLabel>
              <Select
                labelId="selected-tonic"
                value={props.tonic}
                onChange={props.handleTonicChange}
                label="Tonic"
              >
                {tonicOptions()}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="sync-switch-container" style={theme.itemContainerStyle}>

        <div style={theme.itemLabelContainerStyle}>
          <FormLabel>Sync Key/Register</FormLabel>
          <TooltipPopover content={popoverContent()} />
        </div>

        <SwitchCustom checked={props.syncTonics} 
                      onChange={props.handleSyncTonicsChange}
        />
      </div>

      <FormPitchRegister
        note_start={props.note_start}
        handleNoteStartChange={props.handleNoteStartChange}
        note_end={props.note_end}
        handleNoteEndChange={props.handleNoteEndChange}
        octave_start={props.octave_start}
        handleOctaveStartChange={props.handleOctaveStartChange}
        octave_end={props.octave_end}
        handleOctaveEndChange={props.handleOctaveEndChange}
        getText={getText}
        scale={props.scale}
        tonic={props.tonic}
        handleErrors={props.handleErrors}
      />
    </div>
  );
};

export default FormPitch;
