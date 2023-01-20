const FormRestDurations = (props) => {
  return (
    <fieldset>
      <legend>Rest Durations To Allow</legend>

      <input
        type="checkbox"
        name="whole_rest"
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="whole_rest">Whole 1</label>

      <input
        type="checkbox"
        name="half_rest"
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="half_rest">Half 1/2</label>

      <input
        type="checkbox"
        name="quarter_rest"
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="quarter_rest">Quarter 1/4</label>

      <input
        type="checkbox"
        name="eighth_rest"
        onChange={props.handleRestDurationsChange}
      />
      <label htmlFor="eighth_rest">Eighth 1/8</label>
    </fieldset>
  )
}

export default FormRestDurations