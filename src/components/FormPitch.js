import FormPitchRegister from "./FormPitchRegister";

const FormPitch = (props) => {
  return (
    <fieldset>
      <legend>Pitch</legend>

      <label htmlFor="key">Key</label>
      <select name="selectedKey" onChange={props.handleKeyChange}>
        <option value="C">C</option>
        <option value="Cs">C&#x266f; / D&#x266d;</option>
        <option value="D">D</option>
        <option value="Ds">D&#x266f; / E&#x266d;</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="Fs">F&#x266f; / G&#x266d;</option>
        <option value="G">G</option>
        <option value="Gs">G&#x266f; / A&#x266d;</option>
        <option value="A">A</option>
        <option value="As">A&#x266f; / B&#x266d;</option>
        <option value="B">B</option>
      </select>

      <label htmlFor="scale">Scale</label>
      <select name="selectedScale" onChange={props.handleScaleChange}>
        <option value="major">Major</option>
        <option value="minor">Minor</option>
      </select>

      <FormPitchRegister 
        handleNoteStartChange={props.handleNoteStartChange}
        handleNoteEndChange={props.handleNoteEndChange}
        handleOctaveStartChange={props.handleOctaveStartChange}
        handleOctaveEndChange={props.handleOctaveEndChange}
      />
    </fieldset>
  );
};

export default FormPitch;
