const FormMeasures = (props) => {
  return (
    <div>
      <label htmlFor="selectedMeasures">Number of Measures</label>
      <input
        type="number"
        name="selectedMeasures"
        value = {props.num_measures}
        min={props.minMeasures}
        max={props.maxMeasures}
        onChange={props.handleNumMeasuresChange}
      />
    </div>
  );
};

export default FormMeasures;
