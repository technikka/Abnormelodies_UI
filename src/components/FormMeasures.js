const FormMeasures = (props) => {
  return (
    <fieldset>
      <label htmlFor="num_measures">Number of Measures</label>
      <input type="number" name="num_measures" min={1} max={12} onChange={props.handleNumMeasuresChange} />
    </fieldset>
  );
};

export default FormMeasures;
