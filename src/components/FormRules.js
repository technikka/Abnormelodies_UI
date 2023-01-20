const FormRules = (props) => {
  return (
    <fieldset>
      <legend>Optional Features</legend>

      <input
        type="checkbox"
        name="smooth_resolve"
        onChange={props.handleRulesChange}
      />
      <label htmlFor="smooth_resolve">Smooth Resolve</label>
    </fieldset>
  )
}

export default FormRules