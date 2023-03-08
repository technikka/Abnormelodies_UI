import { useState } from "react";
import { Modal, IconButton, Box, Typography, Tooltip, Grid } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TooltipIcon from "../icons/TooltipIcon";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import NoteWholeIcon from "../icons/NoteWholeIcon";
import NoteHalfIcon from "../icons/NoteHalfIcon";
import NoteQuarterIcon from "../icons/NoteQuarterIcon";
import NoteEighthIcon from "../icons/NoteEighthIcon";
import NoteTripletIcon from "../icons/NoteTripletIcon";
import DotIcon from "../icons/DotIcon";
import TieIcon from "../icons/TieIcon";
import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import { useTheme } from '@mui/material/styles';

const HeaderModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '90%',
    overflow: 'scroll',
  };

  const listItem = {marginLeft: 15, marginTop: 0};

  const keywordStyle = {fontWeight: "bold", color: theme.palette.primary.main };
  const timeSigStyle = {color: theme.palette.primary.main, margin: "5px 0"};
  const backgroundStyle = {backgroundColor: "#e2e2e2", borderRadius: "4px", padding: "5px", margin: "5px 0"};
  const durationIconStyle = {display: "inline-block", verticalAlign: "sub", paddingRight: "5px" }

  const errorTip = () => {
    return (
      <ErrorOutlineOutlinedIcon fontSize="small" style={{display: "inline-block", verticalAlign: "sub", color: theme.palette.error.main, paddingRight: "5px" }}/>
    )
  }

  return (
    <Grid>
      <Tooltip title="Tips" placement="left">
        <IconButton onClick={handleOpen}>
          <TipsAndUpdatesIcon fontSize="large" color="secondary"/>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Melody Parameters
          </Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Key</span> indicates the main group of notes that will form the melody. e.g. C Major will use notes C, D, E, F, G, A, and B.</Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}><span style={keywordStyle}>Scale</span> indicates the pattern, or <i>steps</i> used in grouping the notes. Which scale is selected affects the tonic options.</Grid>
                <Grid item style={backgroundStyle}><span style={keywordStyle}>Tonic</span> refers to the first note in the scale, creating the tonal center. </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Register</span> indicates the <i>range</i> of the notes, or pitches. A higher register means a higher pitch; C4 is an octave above C3. e.g. selecting C3 to C5 will allow C3, D3, and so on; C4, D4, and so on.</Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>{errorTip()}order matters. A3 to C3 cannot be selected since A is after C, this is nonsensical. (lower values in the drop down come after values before it)</Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Time Signature</span> indicates how many beats are in each measure with its upper numeral, and indicates which note type equals 1 beat with its lower numeral.</Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item container alignItems="center" style={backgroundStyle}>
                  <FourFourIcon style={timeSigStyle}/> time gets 4 1/4 notes.
                </Grid>
                <Grid item container style={backgroundStyle} rowSpacing={1}>
                  <Grid item container alignItems="center">
                    <ThreeFourIcon style={timeSigStyle} /> gets 3 1/4 notes.
                  </Grid>
                  
                  <Grid item>{errorTip()}whole notes are not allowed; a whole note equals 4 beats and a measure is only 3 beats here. * to allow a duration of 4 beats, see below how <i>ties</i> work.</Grid>
                  <Grid item>
                    {errorTip()}half notes are allowed only if at least one of the following types are also selected:
                    1/8 or 1/4 note, 1/8 or 1/4 rest, or a dot.
                    * This rule also applies to the half note's durational equivalent-- the triplet, minus the dot. (Dotted triplets are not implemented in this version of abnormelodies.)
                  </Grid>
                </Grid>
                
                <Grid item container style={backgroundStyle} rowSpacing={1}>
                  <Grid item container alignItems="center">
                    <SixEightIcon style={timeSigStyle} /> gets 6 1/8 notes per measure.
                  </Grid>
                  
                  <Grid item>{errorTip()}whole notes are not allowed; a whole note would equal 8 beats and a measure is only 6 beats here.</Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <span style={keywordStyle}>Measures</span> are the individual sections, separated by a bar line. The amount of beats that make up a measure are indicated by the Time Signature.
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Note Types</span></Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <NoteEighthIcon style={durationIconStyle}/><span style={keywordStyle}>Eighth</span> notes equal one eighth (1/8) the duration of a whole note. 
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteQuarterIcon style={durationIconStyle}/> <span style={keywordStyle}>Quarter</span> notes equal one quarter (1/4) the duration of a whole note, or double that of an eighth note.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteHalfIcon style={durationIconStyle}/><span style={keywordStyle}>Half</span> notes equal one half (1/2) the duration of a whole note, or double that of a quarter note.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteWholeIcon style={durationIconStyle}/><span style={keywordStyle}>Whole</span> notes are equal to the duration of 8 eighth notes, or 4 quarter notes, or 2 half notes.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteTripletIcon style={durationIconStyle}/><span style={keywordStyle}>Triplet</span> notes are durationally equivalent to a half note here (there are other types not currently implemented in this version of abnormelodies). A triplet creates a unique pattern by fitting three notes into the space of a half note.
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Augmentations</span></Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <DotIcon style={durationIconStyle}/> <span style={keywordStyle}>Dots</span> extend the duration of the note they trail, by one half (1/2) that note's value. e.g in 4/4 time, a dotted quarter note equals 1 1/2 beats. 1 beat (the value of the quarter note) + 1/2 beat (half the value of the quarter note). 
                </Grid>
                <Grid item style={backgroundStyle}>
                  <TieIcon style={durationIconStyle}/><span style={keywordStyle}>Ties</span> connect two notes of the same pitch to create one duration. Two quarter notes tied together play as a half note. Ties are useful in situations where such a duration isnt normally possible, i.e. allowing a duration to cross a barline.
                </Grid>  
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Rest Types</span></Grid>
              <Grid item container spacing={1} ml={1} direction="column">
                <Grid item style={backgroundStyle}>
                  <RestEighthIcon style={durationIconStyle}/><span style={keywordStyle}>Eighth</span> rests
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestQuarterIcon style={durationIconStyle}/><span style={keywordStyle}>Quarter</span> rests
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestHalfIcon style={durationIconStyle}/> <span style={keywordStyle}>Half</span> rests
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestWholeIcon style={durationIconStyle}/> <span style={keywordStyle}>Whole</span> rests
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item><span style={keywordStyle}>Additional Features</span> apply rules and patterns that influence the process of melody generation. *Many more to come!</Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle} >
                  <span style={keywordStyle}>Smooth Resolve</span> influences the generator to prefer longer durations near the end of a melody.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="body2">
            Additional tips will be indicated with a <TooltipIcon /> icon.
          </Typography>
        </Box>
      </Modal>
    </Grid>
  )
}

export default HeaderModal