const FormTimeSignature = (props) => {
  return (
    <div>
      <legend>Time Signature</legend>

      <label htmlFor="4/4">4/4</label>
      <input
        type="radio"
        name="time_signature"
        value="4/4"
        checked={props.time_signature === "4/4"}
        onChange={props.handleTimeSignatureChange}
      />

      <label htmlFor="3/4">3/4</label>
      <input
        type="radio"
        name="time_signature"
        value="3/4"
        checked={props.time_signature === "3/4"}
        onChange={props.handleTimeSignatureChange}
      />

      <label htmlFor="6/8">6/8</label>
      <input
        type="radio"
        name="time_signature"
        value="6/8"
        checked={props.time_signature === "6/8"}
        onChange={props.handleTimeSignatureChange}
      />
    </div>
  );
};

export default FormTimeSignature;
