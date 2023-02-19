import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
import MelodyAudioTempo from "./MelodyAudioTempo";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  FormControlLabel,
  Switch,
  Button,
  ButtonGroup,
  Grid,
  Tooltip
} from "@mui/material";

const MelodyAudio = (props) => {
  const melodyFragments = props.melodyFragments;

  const synth = useRef(null);

  const [tempoFactor, setTempoFactor] = useState(350);
  const autoPlay = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    stopTone();
    if (autoPlay.current) {
      startTone();
    }
  }, [melodyFragments]);

  const handleTempoChange = (event) => {
    setTempoFactor(event.target.value);
  };

  const createSynth = () => {
    synth.current = new Tone.Synth().toDestination();
  };

  const startTone = async () => {
    // if already playing, stop before restart
    if (synth.current && !synth.current.disposed) {
      stopTone();
    }

    createSynth();
    await Tone.start();
    setIsPlaying(true);
    playMelody();
  };

  const stopTone = () => {
    synth.current?.dispose();
    setIsPlaying(false);
  };

  const toneDuration = (fragment, i) => {
    if (fragment.tie && fragment.tie === "start") {
      return (
        (fragment.duration + melodyFragments[i + 1].duration) /
        tempoFactor
      );
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
      synth.current.triggerAttackRelease(fragment["pitch"], duration, time);
      time += duration;
    }
  };

  const handleAutoPlayChange = () => {
    autoPlay.current = !autoPlay.current;
  };

  const playOrRestartBtn = () => {
    if (isPlaying) {
      return (
        <Button id="play-btn" startIcon={<ReplayIcon />} onClick={startTone}>
          Restart
        </Button>
      )
    }
    return (
      <Button id="play-btn" startIcon={<PlayArrowIcon />} onClick={startTone}>
        Play
      </Button>
    ) 
  }

  return (
    <div style={{margin: "10px"}}>
      <Grid container alignItems="center" style={{gap: 15}}>
        <ButtonGroup variant="outlined">
          {playOrRestartBtn()}
          <Button id="stop-btn" startIcon={<StopIcon />} onClick={stopTone}>
            Stop
          </Button>
        </ButtonGroup>
          <FormControlLabel control={
            <Switch
            name="autoplay"
            onChange={handleAutoPlayChange}  />
          } label="Auto Play"/>
          <Tooltip title="When on: new melodies will start playing without the need to click play." placement="top-start" disableInteractive arrow>
            <HelpOutlineIcon fontSize="30px" />
          </Tooltip>
      </Grid>

      <MelodyAudioTempo
        tempoFactor={tempoFactor}
        handleTempoChange={handleTempoChange}
      />
    </div>
  );
};

export default MelodyAudio;
