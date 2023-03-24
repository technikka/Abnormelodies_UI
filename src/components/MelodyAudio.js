import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
import MelodyAudioTempo from "./MelodyAudioTempo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import SwitchCustom from "../components/SwitchCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from '@mui/material/styles';
import {
  FormLabel,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";

const MelodyAudio = (props) => {
  const theme = useTheme();

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
    synth.current = new Tone.Synth({
      onsilence: stopTone,
    }).toDestination();
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
    if (synth.current && !synth.current.disposed) {
      synth.current.dispose();
      setIsPlaying(false);
    }
  };

  const toneDuration = (fragment, i) => {
    if (fragment.tie && fragment.tie === "start") {
      return (
        (fragment.duration + melodyFragments[i + 1].duration) / tempoFactor
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
        <Button
          id="play-btn"
          startIcon={<ReplayIcon />}
          onClick={startTone}
          style={{ width: "118px" }}
        >
          Restart
        </Button>
      );
    }
    return (
      <Button
        id="play-btn"
        startIcon={<PlayArrowIcon />}
        onClick={startTone}
        style={{ width: "118px" }}
      >
        Play
      </Button>
    );
  };

  const popoverContent = () => {
    return (
      <div>
        <Typography variant="caption">
          <b>Auto Play:</b> when on, new melodies will start playing without the
          need to click play.
        </Typography>
      </div>
    );
  };

  return (
    <div className="audio-controls">

        <div>
          <ButtonGroup variant="outlined" color="primary">
            {playOrRestartBtn()}
            <Button
              id="stop-btn"
              startIcon={<StopIcon />}
              onClick={stopTone}
              style={{ width: "118px" }}
            >
              Stop
            </Button>
          </ButtonGroup>
        </div>

        <div className="auto-play" style={theme.itemContainerStyle}>
          <div style={theme.itemLabelContainerStyle}>
            <FormLabel>Auto Play</FormLabel>
            <TooltipPopover content={popoverContent()} />
          </div>
          <SwitchCustom name="autoplay" onChange={handleAutoPlayChange} />
        </div>


      <MelodyAudioTempo
        tempoFactor={tempoFactor}
        handleTempoChange={handleTempoChange}
      />
    </div>
  );
};

export default MelodyAudio;
