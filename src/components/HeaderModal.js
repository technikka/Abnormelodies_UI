import { useState } from "react";
import { Modal, IconButton, Box, Typography, Tooltip } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

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
          <TipsAndUpdatesIcon size="small"/>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6">
            Some sort of title:
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
                <b>4/4</b> time gets 4 1/4 notes. <br />
                <b>3/4 </b>gets 3 1/4 notes. <br />
                <p style={listItem}>
                  <b>{errorTip()}</b> whole notes are not allowed; a whole note equals 4 beats and a measure is only 3 beats here. <br />
                  * to allow a duration of 4 beats, please see below how <i>ties</i> work.
                </p>
                <p style={listItem}>
                  <b>{errorTip()}</b> half notes are allowed only if at least one of the following types are also selected; a half note equals 2 beats, leaving 1 beat needed to fill a measure: <br />
                  1/8 or 1/4 note, 1/8 or 1/4 rest, or a dot.
                </p>
                <b>6/8</b> gets 6 1/8 notes per measure.
                <p style={listItem}>
                  <b>{errorTip()}</b> 
                </p> 
              </p>
            </p>

            Additional tips will be indicated with a ? icon.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default HeaderModal