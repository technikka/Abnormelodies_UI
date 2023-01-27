const FormNoteDurations = (props) => {
  const isChecked = (duration) => {
    return props.note_durations[duration] === true;
  };

  return (
    <div>
      <legend>Note Durations To Allow</legend>

      <input
        type="checkbox"
        name="1"
        checked={isChecked("1")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1">Whole 1</label>

      <input
        type="checkbox"
        name="1/2"
        checked={isChecked("1/2")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/2">Half 1/2</label>

      <input
        type="checkbox"
        name="1/4"
        checked={isChecked("1/4")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/4">Quarter 1/4</label>

      <input
        type="checkbox"
        name="1/8"
        checked={isChecked("1/8")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/8">Eighth 1/8</label>

      <input
        type="checkbox"
        name="triplet"
        checked={isChecked("triplet")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="triplet">Triplet</label>

      <input
        type="checkbox"
        name="dot"
        checked={isChecked("dot")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="dot">Dot</label>

      <input
        type="checkbox"
        name="tie"
        checked={isChecked("tie")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="tie">Tie</label>
    </div>
  );
};

export default FormNoteDurations;
