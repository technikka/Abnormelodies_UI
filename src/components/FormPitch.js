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
        return (
          <option key={uniqid()} value={tonic}>
            {getText(tonic)}
          </option>
        );
      });
    }
    return majorTonics.map((tonic) => {
      return (
        <option key={uniqid()} value={tonic}>
          {getText(tonic)}
        </option>
      );
    });
  };

  return (
    <div>
      <legend>Pitch</legend>

      <label htmlFor="selectedScale">Scale</label>
      <select
        name="selectedScale"
        value={props.scale}
        onChange={props.handleScaleChange}
      >
        <option value="major">Major</option>
        <option value="minor">Minor</option>
      </select>

      <label htmlFor="selectedTonic">Tonic</label>
      <select
        name="selectedTonic"
        value={props.tonic}
        onChange={props.handleTonicChange}
      >
        {tonicOptions()}
      </select>

      <FormPitchRegister
        note_start={props.note_start}
        handleNoteStartChange={props.handleNoteStartChange}
        note_end={props.note_end}
        handleNoteEndChange={props.handleNoteEndChange}
        octave_start={props.octave_start}
        handleOctaveStartChange={props.handleOctaveStartChange}
        octave_end={props.octave_end}
        handleOctaveEndChange={props.handleOctaveEndChange}
        tonicOptions={tonicOptions}
      />
    </div>
  );
};

export default FormPitch;
