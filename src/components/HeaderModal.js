import { useState } from "react";
import { Modal, IconButton, Box, Typography, Tooltip } from '@mui/material';
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

const HeaderModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const errorTip = () => {
    return (
      <ErrorOutlineOutlinedIcon fontSize="small"/>
    )
  }

  return (
    <div>
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
          <Typography variant="h6">
            Melody Parameters
          </Typography>
          <Typography>
            <p>
              <b>Key</b> indicates the main group of notes that will form the melody.
              <br /> e.g. C Major will use notes C, D, E, F, G, A, and B.
            </p>
            <p>
              <b>Register</b> indicates the <i>range</i> of the notes, or pitches. A higher register means a higher pitch; C4 is an octave above C3.
              <br /> e.g. selecting C3 to C5 will allow C3, D3, and so on; C4, D4, and so on.
              <p style={listItem}>
                <b>{errorTip()}</b> order matters. A3 to C3 cannot be selected since A is after C, this is nonsensical. (lower values in the drop down come after values before it)
              </p>
            </p>
            <p>
              <b>Time Signature</b> indicates how many beats are in each measure with its upper numeral, and indicates which note type equals 1 beat with its lower numeral.
              <p style={listItem}>
                <FourFourIcon /> time gets 4 1/4 notes. <br />
                <ThreeFourIcon /> gets 3 1/4 notes. <br />
                <p style={listItem}>
                  <b>{errorTip()}</b> whole notes are not allowed; a whole note equals 4 beats and a measure is only 3 beats here. <br />
                  * to allow a duration of 4 beats, see below how <i>ties</i> work.
                </p>
                <p style={listItem}>
                  <b>{errorTip()}</b> half notes are allowed only if at least one of the following types are also selected: <br />
                  1/8 or 1/4 note, 1/8 or 1/4 rest, or a dot. <br />
                  * This rule also applies to the half note's durational equivalent-- the triplet, minus the dot. (Dotted triplets are not implemented in this version of abnormelodies.)
                </p>
                <SixEightIcon /> gets 6 1/8 notes per measure.
                <p style={listItem}>
                  <b>{errorTip()}</b> whole notes are not allowed; a whole note would equal 8 beats and a measure is only 6 beats here. 
                </p> 
              </p>
            </p>
            <p>
              <b>Measures</b> are the individual sections, separated by a bar line. The amount of beats that make up a measure are indicated by the Time Signature. 
            </p>
            <p>
              <b>Note Types</b>
              <p style={listItem}>
                <NoteEighthIcon /> <b>Eighth</b> notes equal one eighth (1/8) the duration of a whole note. <br />
                <NoteQuarterIcon /> <b>Quarter</b> notes equal one quarter (1/4) the duration of a whole note, or double that of an eighth note. <br />
                <NoteHalfIcon /> <b>Half</b> notes equal one half (1/2) the duration of a whole note, or double that of a quarter note. <br />
                <NoteWholeIcon /> <b>Whole</b> notes are equal to the duration of 8 eighth notes, or 4 quarter notes, or 2 half notes. <br />
                <NoteTripletIcon /> <b>Triplet</b> notes are durationally equivalent to a half note here (there are other types not currently implemented in this version of abnormelodies). A triplet creates a unique pattern by fitting three notes into the space of a half note.
              </p>
              <p>
                <b>Augmentations</b>
                <p style={listItem}>
                  <DotIcon /> <b>Dots</b> extend the duration of the note they trail, by one half (1/2) that note's value. <br />
                  e.g in 4/4 time, a dotted quarter note equals 1 1/2 beats. 1 beat (the value of the quarter note) + 1/2 beat (half the value of the quarter note). <br />
                  <TieIcon /> <b>Ties</b> connect two notes of the same pitch to create one duration. Two quarter notes tied together play as a half note. Ties are useful in situations where such a duration isnt normally possible, i.e. allowing a duration to cross a barline.  
                </p>
              </p>
              <p>
                <b>Rest Types</b>
                <p style={listItem}>
                  <RestEighthIcon /> <b>Eighth</b> rests <br />
                  <RestQuarterIcon /> <b>Quarter</b> rests <br />
                  <RestHalfIcon /> <b>Half</b> rests <br />
                  <RestWholeIcon /> <b>Whole</b> rests
                </p>
              </p>
              <p>
                <b>Additional Features</b> apply rules and patterns that influence the process of melody generation. *Many more to come!
                <p style={listItem}>
                  <b>Smooth Resolve</b> influences the generator to prefer longer durations near the end of a melody.
                </p>
              </p>
            </p>
          </Typography>
          <Typography variant="body2">
            Additional tips will be indicated with a <TooltipIcon /> icon.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default HeaderModal