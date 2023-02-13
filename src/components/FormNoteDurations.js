const FormNoteDurations = (props) => {
  const isChecked = (duration) => {
    return props.note_durations[duration] === true;
  };

  const getTitle = (type) => {
    if (props.time_signature === "6/8") {
      if (type === "1/8") {
        return "note type required in 6/8 time."
      }
      if (type === "1") {
        return "note type not allowed in 6/8 time."
      }
    }
    return type
  }

  return (
    <div>
      <legend>Note Durations To Allow</legend>

      <input
        type="checkbox"
        name="1"
        checked={isChecked("1")}
        title={getTitle("1")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1">Whole 1</label>

      <input
        type="checkbox"
        name="1/2"
        checked={isChecked("1/2")}
        title={getTitle("1/2")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/2">Half 1/2</label>

      <input
        type="checkbox"
        name="1/4"
        checked={isChecked("1/4")}
        title={getTitle("1/4")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/4">Quarter 1/4</label>

      <input
        type="checkbox"
        name="1/8"
        checked={isChecked("1/8")}
        title={getTitle("1/8")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="1/8">Eighth 1/8</label>

      <input
        type="checkbox"
        name="triplet"
        checked={isChecked("triplet")}
        title={getTitle("triplet")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="triplet">Triplet</label>

      <input
        type="checkbox"
        name="dot"
        checked={isChecked("dot")}
        title={getTitle("dot")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="dot">Dot</label>

      <input
        type="checkbox"
        name="tie"
        checked={isChecked("tie")}
        title={getTitle("tie")}
        onChange={props.handleNoteDurationsChange}
      />
      <label htmlFor="tie">Tie</label>
    </div>
  );
};

export default FormNoteDurations;
