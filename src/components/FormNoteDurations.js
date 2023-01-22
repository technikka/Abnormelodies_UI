const FormNoteDurations = (props) => {
  return (
    <div onChange={props.handleNoteDurationsChange}>
      <legend>Note Durations To Allow</legend>

      <input type="checkbox" name="1" />
      <label htmlFor="1">Whole 1</label>

      <input type="checkbox" name="1/2" />
      <label htmlFor="1/2">Half 1/2</label>

      <input type="checkbox" name="1/4" />
      <label htmlFor="1/4">Quarter 1/4</label>

      <input type="checkbox" name="1/8" />
      <label htmlFor="1/8">Eighth 1/8</label>

      <input type="checkbox" name="triplet" />
      <label htmlFor="triplet">Triplet</label>

      <input type="checkbox" name="dot" />
      <label htmlFor="dot">Dot</label>

      <input type="checkbox" name="tie" />
      <label htmlFor="tie">Tie</label>
    </div>
  );
};

export default FormNoteDurations;
