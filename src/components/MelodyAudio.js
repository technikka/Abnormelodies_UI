import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
import MelodyAudioTempo from "./MelodyAudioTempo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay";
import SwitchCustom from "../components/SwitchCustom";
import TooltipPopover from "../components/TooltipPopover";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormLabel, Button, ButtonGroup, Typography } from "@mui/material";

const MelodyAudio = (props) => {
  const theme = useTheme();

  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const playControlsBreakpoint = useMediaQuery(theme.breakpoints.playControls);

  const melodyFragments = props.melodyFragments;

  const synth = useRef(null);

  const [currentTempo, setCurrentTempo] = useState(350);
  const tempoStep = 50;
  const tempoMin = 250;
  const tempoMax = 450;

  const autoPlay = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    stopTone();
    if (autoPlay.current) {
      startTone();
    }
  }, [melodyFragments]);

  const handleTempoChange = (event) => {
    setCurrentTempo(event.target.value);
  };

  const increaseTempo = () => {
    const newValue = currentTempo + tempoStep;
    if (newValue <= tempoMax) {
      setCurrentTempo(currentTempo + tempoStep);
    }
  };

  const decreaseTempo = () => {
    const newValue = currentTempo - tempoStep;
    if (newValue >= tempoMin) {
      setCurrentTempo(currentTempo - tempoStep);
    }
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
    let tempoControl = currentTempo;
    if (props.beatType === "8") {
      tempoControl = currentTempo * 2
    }

    if (fragment.tie && fragment.tie === "start") {
      return (
        (fragment.duration + melodyFragments[i + 1].duration) / tempoControl
      );
    } else if (fragment.tie && fragment.tie === "stop") {
      return 0;
    } else {
      return fragment.duration / tempoControl;
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

  const buttonScale = "1.1";

  const playOrRestartBtn = () => {
    if (isPlaying) {
      return (
        <Button
          id="play-btn"
          startIcon={<ReplayIcon style={{ scale: buttonScale }} />}
          onClick={startTone}
          style={buttonStyle}
        >
          Restart
        </Button>
      );
    }
    return (
      <Button
        id="play-btn"
        startIcon={<PlayArrowIcon style={{ scale: buttonScale }} />}
        onClick={startTone}
        style={buttonStyle}
      >
        Play
      </Button>
    );
  };

  const mobilePlayOrRestartBtn = () => {
    if (isPlaying) {
      return (
        <Button
          variant="contained"
          id="play-btn"
          startIcon={<ReplayIcon style={{ scale: buttonScale }} />}
          onClick={startTone}
          sx={mobileButtonStyle}
          aria-label="restart"
        ></Button>
      );
    }
    return (
      <Button
        variant="contained"
        id="play-btn"
        startIcon={<PlayArrowIcon style={{ scale: buttonScale }} />}
        onClick={startTone}
        sx={mobileButtonStyle}
        aria-label="play"
      ></Button>
    );
  };

  const popoverContent = () => {
    return (
      <div>
        <Typography role="text" variant="caption">
          <b>Auto-Play:</b> when on, new melodies will start playing without the
          need to click play.
        </Typography>
      </div>
    );
  };

  const containerStyle = {
    backgroundColor: theme.palette.background.main,
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    position: "fixed",
    bottom: "0",
    width: "100vw",
    maxWidth: theme.appMaxWidth,
    zIndex: "5",
    alignItems: "center",
    justifyItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px -2.6px 3px",
  };

  const mobileButtonStyle = {
    "& .MuiButton-startIcon": {
      margin: "0",
      scale: "1.5",
    },
    padding: "10px",
    margin: "8px",
    minWidth: "0",
    width: "50px",
    height: "50px",
  };

  const buttonStyle = {
    fontSize: "1rem",
    width: "118px",
  };

  const buttonGroupStyle = {
    scale: buttonScale,
    margin: "0.3em",
    width: "max-content",
  };

  return (
    <div className="audio-controls" style={containerStyle}>
      <div className="auto-play" style={theme.audioControlStyle}>
        <SwitchCustom
          name="autoplay"
          onChange={handleAutoPlayChange}
          inputProps={{ "aria-label": "auto-play" }}
        />
        <div
          style={
            mobile
              ? theme.mobileAudioLabelContainerStyle
              : theme.audioControlLabelContainerStyle
          }
        >
          <FormLabel style={theme.itemLabelStyle}>Auto-Play</FormLabel>
          <TooltipPopover
            content={popoverContent()}
            label="auto-play"
            style={mobile ? { padding: "0" } : {}}
          />
        </div>
      </div>

      <div style={{ width: "max-content" }}>
        {!playControlsBreakpoint && (
          <ButtonGroup
            variant={"outlined"}
            color="primary"
            aria-label="audio controls"
            style={buttonGroupStyle}
          >
            {playOrRestartBtn()}

            <Button
              id="stop-btn"
              startIcon={<StopIcon style={{ scale: buttonScale }} />}
              onClick={stopTone}
              style={buttonStyle}
            >
              Stop
            </Button>
          </ButtonGroup>
        )}

        {playControlsBreakpoint && (
          <div>
            {mobilePlayOrRestartBtn()}
            <Button
              id="stop-btn"
              variant="contained"
              onClick={stopTone}
              startIcon={<StopIcon style={{ scale: buttonScale }} />}
              sx={mobileButtonStyle}
              aria-label="stop"
            ></Button>
          </div>
        )}
      </div>

      <MelodyAudioTempo
        currentTempo={currentTempo}
        tempoStep={tempoStep}
        tempoMax={tempoMax}
        tempoMin={tempoMin}
        handleTempoChange={handleTempoChange}
        increaseTempo={increaseTempo}
        decreaseTempo={decreaseTempo}
      />
    </div>
  );
};

export default MelodyAudio;
