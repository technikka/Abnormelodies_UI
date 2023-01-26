import uniqid from "uniqid";
import FormPitchRegister from "./FormPitchRegister";

const FormPitch = (props) => {
  const majorTonics = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Fs",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];

  const minorTonics = [
    "C",
    "Cs",
    "D",
    "Ds",
    "Eb",
    "E",
    "F",
    "Fs",
    "G",
    "Gs",
    "A",
    "Bb",
    "B",
  ];

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
        return <option key={uniqid()} value={tonic}>{getText(tonic)}</option>;
      });
    }
    return majorTonics.map((tonic) => {
      return <option key={uniqid()} value={tonic}>{getText(tonic)}</option>;
    });
  };

  return (
    <div>
      <legend>Pitch</legend>

      <label htmlFor="scale">Scale</label>
      <select
        name="selectedScale"
        defaultValue={props.scale}
        onChange={props.handleScaleChange}
      >
        <option value="major">Major</option>
        <option value="minor">Minor</option>
      </select>

      <label htmlFor="tonic">Tonic</label>
      <select
        name="selectedTonic"
        defaultValue={props.tonic}
        onChange={props.handleTonicChange}
      >
        {tonicOptions()}
      </select>

      <FormPitchRegister
        handleNoteStartChange={props.handleNoteStartChange}
        handleNoteEndChange={props.handleNoteEndChange}
        handleOctaveStartChange={props.handleOctaveStartChange}
        handleOctaveEndChange={props.handleOctaveEndChange}
      />
    </div>
  );
};

export default FormPitch;
