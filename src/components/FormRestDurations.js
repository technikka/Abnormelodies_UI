const FormRestDurations = (props) => {
  const isChecked = (duration) => {
    return props.rest_durations[duration] === true;
  };

  return (
    <div>
      <legend>Rest Durations To Allow</legend>

      <input
        type="checkbox"
        name="1"
        checked={isChecked("1")}
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="1">Whole 1</label>

      <input
        type="checkbox"
        name="1/2"
        checked={isChecked("1/2")}
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="1/2">Half 1/2</label>

      <input
        type="checkbox"
        name="1/4"
        checked={isChecked("1/4")}
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="1/4">Quarter 1/4</label>

      <input
        type="checkbox"
        name="1/8"
        checked={isChecked("1/8")}
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="1/8">Eighth 1/8</label>
    </div>
  );
};

export default FormRestDurations;
