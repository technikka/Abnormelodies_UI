import uniqid from "uniqid";
import { minorTonics, majorTonics } from "../Data";
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";

const FormKey = (props) => {
  const theme = useTheme();

  const tonicOptions = () => {
    if (props.scale === "minor") {
      return minorTonics.map((tonic) => {
        return (
          <MenuItem key={uniqid()} value={tonic}>
            {props.formatTonicString(tonic)}
          </MenuItem>
        );
      });
    }
    return majorTonics.map((tonic) => {
      return (
        <MenuItem key={uniqid()} value={tonic}>
          {props.formatTonicString(tonic)}
        </MenuItem>
      );
    });
  };

  return (
    <div style={theme.itemContainerStyle}>

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
  );
};

export default FormKey;