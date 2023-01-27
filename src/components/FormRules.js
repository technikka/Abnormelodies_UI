const FormRules = (props) => {
  const isChecked = (rule) => {
    return props.rules[rule] === true;
  };

  return (
    <div>
      <legend>Optional Features</legend>

      <input
        type="checkbox"
        name="smooth_resolve"
        checked={isChecked("smooth_resolve")}
        onChange={props.handleRulesChange}
      />
      <label htmlFor="smooth_resolve">Smooth Resolve</label>
    </div>
  );
};

export default FormRules;
