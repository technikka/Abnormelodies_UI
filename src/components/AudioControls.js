import * as Tone from "tone";

const AudioControls = (props) => {
  const melodyFragments = props.melodyFragments
  let synth;

  const createSynth = () => {
    synth = new Tone.Synth().toDestination();
  }

  const startTone = async () => {
    if (synth && !synth.disposed) {
      stopTone();
    }

    createSynth();
    await Tone.start();
    playMelody();
  }

  const stopTone = () => {
    synth.dispose();
  }

  const toneDuration = (fragment, i, tempoFactor = 350) => {
    if (fragment.tie && fragment.tie === "start") {
      return (fragment.duration + melodyFragments[i + 1].duration) / tempoFactor;
    } else if (fragment.tie && fragment.tie === "stop") {
      return 0;
    } else {
      return fragment.duration / tempoFactor;
    }
  };

  const playMelody = () => {
    let time = Tone.now();
    for (let i = 0; i < melodyFragments.length; i++) {
      let fragment = melodyFragments[i];
      const duration = toneDuration(fragment, i);
      synth.triggerAttackRelease(fragment["pitch"], duration, time);
      time += duration;
    }
  };

  return (
    <div>
      <button id="play-btn" onClick={startTone}>
        Play
      </button>
      <button id="stop-btn" onClick={stopTone}>
        Stop
      </button>
    </div>
  )
}

export default AudioControls