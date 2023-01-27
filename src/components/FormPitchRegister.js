import uniqid from "uniqid";

const FormPitchRegister = (props) => {
  const octaveValues = ["1", "2", "3", "4", "5", "6", "7"];

  const octaveStartOptions = () => {
    return octaveValues.map((value) => {
      return (
        <option key={uniqid()} value={value}>
          {value}
        </option>
      );
    });
  };

  const octaveEndOptions = () => {
    const index = octaveValues.indexOf(props.octave_start)
    return octaveValues.slice(index).map((value) => {
      return (
        <option key={uniqid()} value={value}>
          {value}
        </option>
      );
    });
  };

  return (
    <div>
      <legend>Register</legend>

      <label htmlFor="selectedNoteStart">From</label>
      <select
        name="selectedNoteStart"
        value={props.note_start}
        onChange={props.handleNoteStartChange}
      >
        {props.tonicOptions()}
      </select>

      <label htmlFor="selectedOctaveStart" hidden={true}></label>
      <select
        name="selectedOctaveStart"
        value={props.octave_start}
        onChange={props.handleOctaveStartChange}
      >
        {octaveStartOptions()}
      </select>

      <label htmlFor="selectedNoteEnd">To</label>
      <select
        name="selectedNoteEnd"
        value={props.note_end}
        onChange={props.handleNoteEndChange}
      >
        {props.tonicOptions()}
      </select>

      <label htmlFor="selectedOctaveEnd" hidden={true}></label>
      <select
        name="selectedOctaveEnd"
        value={props.octave_end}
        onChange={props.handleOctaveEndChange}
      >
        {octaveEndOptions()}
      </select>
    </div>
  );
};

export default FormPitchRegister;
