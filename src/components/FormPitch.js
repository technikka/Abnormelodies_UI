import uniqid from "uniqid";
import FormPitchRegister from "./FormPitchRegister";
import { minorTonics, majorTonics } from "../Data";
import SwitchCustom from "../components/SwitchCustom";
import TooltipPopover from "../components/TooltipPopover";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";

const FormPitch = (props) => {
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
          <b>Sync With Register:</b> when active, register selection changes to
          match the tonic you select here. You can still change the register
          notes, but they'll sync with the key tonic again if you change it.
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <FormLabel>Key</FormLabel>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
        </Grid>

        <Grid item>
          <FormControlLabel
            control={<SwitchCustom />}
            label="Sync with Register"
            checked={props.syncTonics}
            onChange={props.handleSyncTonicsChange}
            labelPlacement="top"
          />
          <TooltipPopover content={popoverContent()} />
        </Grid>
      </Grid>

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
