import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Modal, Button, Box, Typography, Tooltip } from "@mui/material";
import { useState } from "react";

const FormRestDurationsModal = () => {
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
      <Tooltip title="View rest values" placement="right" disableInteractive>
        <Button variant="text" size="small" onClick={handleOpen} startIcon={<InfoOutlinedIcon />}>
          Key
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant={"h6"}>Rests</Typography>
          <br />
          <Typography>
            <Typography>
              <RestEighthIcon /> <b>Eighth</b> - 1/8 of a whole.
            </Typography>
            <Typography>
              <RestQuarterIcon /> <b>Quarter</b> - 1/4 of a whole.
            </Typography>
            <Typography>
              <RestHalfIcon /> <b>Half</b> - 1/2 of a whole.
            </Typography>
            <Typography>
              <RestWholeIcon /> <b>Whole</b>
            </Typography>
            <br />
            <Typography variant="body2">
              Check out <TipsAndUpdatesIcon fontSize="small" color="secondary"/> for more detailed information.
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </div>
  )

}

export default FormRestDurationsModal;