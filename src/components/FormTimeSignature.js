const FormTimeSignature = (props) => {
  return (
    <fieldset>
      <legend>Time Signature</legend>

      <label htmlFor="4/4">4/4</label>
      <input
        type="radio"
        name="timeSignature"
        value="4/4"
        onChange={props.handleTimeSignatureChange}
      />

      <label htmlFor="3/4">3/4</label>
      <input
        type="radio"
        name="time_signature"
        value="3/4"
        onChange={props.handleTimeSignatureChange}
      />

      <label htmlFor="6/8">6/8</label>
      <input
        type="radio"
        name="time_signature"
        value="6/8"
        onChange={props.handleTimeSignatureChange}
      />
    </fieldset>
  );
};

export default FormTimeSignature;
