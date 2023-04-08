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

  const buttonScale = "1.1"

  const playOrRestartBtn = () => {
    if (isPlaying) {
      return (
        <Button
          id="play-btn"
          startIcon={<ReplayIcon style={{scale: buttonScale}}/>}
          onClick={startTone}
          style={{fontSize: "1rem", width: "118px" }}
        >
          Restart
        </Button>
      );
    }
    return (
      <Button
        id="play-btn"
        startIcon={<PlayArrowIcon style={{scale: buttonScale}}/>}
        onClick={startTone}
        style={{fontSize: "1rem", width: "118px" }}
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

  const containerStyle = {
    backgroundColor: theme.palette.background.main,
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    position: "sticky",
    bottom: "0",
    width: "100%",
    zIndex: "10",
    alignItems: "center",
    justifyItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px -2.6px 3px"
  }

  return (
    <div className="audio-controls" style={containerStyle}>

      <div className="auto-play" style={theme.audioControlStyle}>

        <SwitchCustom name="autoplay" onChange={handleAutoPlayChange} />

        <div style={theme.audioControlLabelContainerStyle}>
          <FormLabel style={theme.itemLabelStyle}>Auto-Play</FormLabel>
          <TooltipPopover content={popoverContent()} />
        </div>

        
        
      </div>

      <div style={{width: "max-content"}}>
        <ButtonGroup 
          variant="outlined" 
          color="primary"
          aria-label="audio controls"
          style={{
            scale: buttonScale, 
            margin: "0.3em", 
            width: "max-content", 
            backgroundColor: "#f7f7f7",
          }}
        >
          {playOrRestartBtn()}
          <Button
            id="stop-btn"
            startIcon={<StopIcon style={{scale: buttonScale}}/>}
            onClick={stopTone}
            style={{
              fontSize: "1rem",  
              width: "118px",
            }}
          >
            Stop
          </Button>
        </ButtonGroup>
      </div>

      <MelodyAudioTempo
        tempoFactor={tempoFactor}
        handleTempoChange={handleTempoChange}
      />
    </div>
  );
};

export default MelodyAudio;
