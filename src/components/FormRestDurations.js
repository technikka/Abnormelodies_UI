const FormRestDurations = (props) => {
  return (
    <div onChange={props.handleRestDurationsChange}>
      <legend>Rest Durations To Allow</legend>

      <input type="checkbox" name="1" />
      <label htmlFor="1">Whole 1</label>

      <input type="checkbox" name="1/2" />
      <label htmlFor="1/2">Half 1/2</label>

      <input type="checkbox" name="1/4" />
      <label htmlFor="1/4">Quarter 1/4</label>

      <input type="checkbox" name="1/8" />
      <label htmlFor="1/8">Eighth 1/8</label>
    </div>
  );
};

export default FormRestDurations;
