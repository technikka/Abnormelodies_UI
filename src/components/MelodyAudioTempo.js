const MelodyAudioTempo = (props) => {
  return (
    <div>
      <label>
        Tempo{" "}
        <input
          type="range"
          name="tempo"
          min="250"
          max="450"
          step="50"
          defaultValue={props.tempoFactor}
          onChange={props.handleTempoChange}
        />
      </label>
    </div>
  );
};

export default MelodyAudioTempo;
