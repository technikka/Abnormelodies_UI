const FormPitchRegister = (props) => {
  return (
    <fieldset>
      <legend>Register</legend>

      <label htmlFor="note_start">From</label>
      <select name="note_start" onChange={props.handleNoteStartChange}>
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

      <label htmlFor="octave_start" hidden={true}></label>
      <select name="octave_start" onChange={props.handleOctaveStartChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>

      <label htmlFor="note_end">To</label>
      <select name="note_end" onChange={props.handleNoteEndChange}>
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

      <label htmlFor="octave_end" hidden={true}></label>
      <select name="octave_end" onChange={props.handleOctaveEndChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </fieldset>
  );
};

export default FormPitchRegister;
