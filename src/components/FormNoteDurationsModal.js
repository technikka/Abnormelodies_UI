import NoteWholeIcon from "../icons/NoteWholeIcon";
import NoteHalfIcon from "../icons/NoteHalfIcon";
import NoteQuarterIcon from "../icons/NoteQuarterIcon";
import NoteEighthIcon from "../icons/NoteEighthIcon";
import NoteTripletIcon from "../icons/NoteTripletIcon";
import DotIcon from "../icons/DotIcon";
import TieIcon from "../icons/TieIcon";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Modal, Button, Box, Typography, Tooltip } from "@mui/material";
import { useState } from "react";

const FormNoteDurationsModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "300px",
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Tooltip title="View note values" placement="right" disableInteractive>
        <Button variant="text" size="small" onClick={handleOpen} endIcon={<VpnKeyIcon />}>
          Key
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant={"h6"}>Notes and Augmentations</Typography>
          <Typography>
            <Typography>
              <NoteEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
            </Typography>
            <Typography>
              <NoteQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
            </Typography>
            <Typography>
              <NoteHalfIcon /> <b>Half</b> - 1/2 of a whole.
            </Typography>
            <Typography>
              <NoteWholeIcon /> <b>Whole</b>
            </Typography>
            <Typography>
              <NoteTripletIcon /> <b>Triplet</b> - the sum of the set equals 1/2 of a whole.
            </Typography>
            <br />
            <Typography>
              <DotIcon /> <b>Dots</b> - extend its note's duration by 1/2 that note's value.
            </Typography>
            <Typography>
              <TieIcon /> <b>Ties</b> - connect two notes of the same pitch to create one duration.
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FormNoteDurationsModal;
