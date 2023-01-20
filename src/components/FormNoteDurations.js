const FormNoteDurations = (props) => {
  return (
    <div onChange={props.handleNoteDurationsChange}>
      <legend>Note Durations To Allow</legend>

      <input type="checkbox" name="whole_note" />
      <label htmlFor="whole_note">Whole 1</label>

      <input type="checkbox" name="half_note" />
      <label htmlFor="half_note">Half 1/2</label>

      <input type="checkbox" name="quarter_note" />
      <label htmlFor="quarter_note">Quarter 1/4</label>

      <input type="checkbox" name="eighth_note" />
      <label htmlFor="eighth_note">Eighth 1/8</label>

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
