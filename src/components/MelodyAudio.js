import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import MelodyAudioTempo from "./MelodyAudioTempo";

const MelodyAudio = (props) => {
  const melodyFragments = props.melodyFragments;
  let synth;

  const tempoFactor= useRef(350);

  const handleTempoChange = (event) => {
    tempoFactor.current = event.target.value;
  };


  const createSynth = () => {
    synth = new Tone.Synth().toDestination();
  };

  const startTone = async () => {
    if (synth && !synth.disposed) {
      stopTone();
    }

    createSynth();
    await Tone.start();
    playMelody();
  };

  const stopTone = () => {
    synth.dispose();
  };

  const toneDuration = (fragment, i) => {
    if (fragment.tie && fragment.tie === "start") {
      return (
        (fragment.duration + melodyFragments[i + 1].duration) / tempoFactor.current
      );
    } else if (fragment.tie && fragment.tie === "stop") {
      return 0;
    } else {
      return fragment.duration / tempoFactor.current;
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
      <MelodyAudioTempo
        tempoFactor={tempoFactor.current}
        handleTempoChange={handleTempoChange}
      />
    </div>
  );
};

export default MelodyAudio;
