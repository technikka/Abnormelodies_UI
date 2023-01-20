const FormRestDurations = (props) => {
  return (
    <div onChange={props.handleRestDurationsChange}>
      <legend>Rest Durations To Allow</legend>

      <input type="checkbox" name="whole_rest" />
      <label htmlFor="whole_rest">Whole 1</label>

      <input type="checkbox" name="half_rest" />
      <label htmlFor="half_rest">Half 1/2</label>

      <input type="checkbox" name="quarter_rest" />
      <label htmlFor="quarter_rest">Quarter 1/4</label>

      <input type="checkbox" name="eighth_rest" />
      <label htmlFor="eighth_rest">Eighth 1/8</label>
    </div>
  );
};

export default FormRestDurations;
