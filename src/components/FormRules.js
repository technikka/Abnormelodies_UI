const FormRules = (props) => {
  return (
    <div onChange={props.handleRulesChange}>
      <legend>Optional Features</legend>

      <input type="checkbox" name="smooth_resolve" />
      <label htmlFor="smooth_resolve">Smooth Resolve</label>
    </div>
  );
};

export default FormRules;
