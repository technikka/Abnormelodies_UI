const FormNoteDurations = (props) => {
  return (
    <fieldset>
      <legend>Note Durations To Allow</legend>

      <input
        type="checkbox"
        name="whole_note"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="whole_note">Whole 1</label>

      <input
        type="checkbox"
        name="half_note"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="half_note">Half 1/2</label>

      <input
        type="checkbox"
        name="quarter_note"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="quarter_note">Quarter 1/4</label>

      <input
        type="checkbox"
        name="eighth_note"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="eighth_note">Eighth 1/8</label>

      <input
        type="checkbox"
        name="triplet"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="triplet">Triplet</label>

      <input
        type="checkbox"
        name="dot"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="dot">Dot</label>

      <input
        type="checkbox"
        name="Tie"
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="Tie">Tie</label>
    </fieldset>
  );
};

export default FormNoteDurations;
