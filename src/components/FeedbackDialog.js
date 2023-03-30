import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedbackDialog = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="text"
        startIcon={<FeedbackIcon style={{transform: "rotateY(360deg)"}}/>}
        size="large"
        onClick={handleOpen}
      >
        Feedback?
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Found a bug? Suggestions for improvement? Corrections on my use of music theory? Features you'd like to see added? All feedback is welcome!
          </DialogContentText>
          <TextField
            variant="outlined" 
            autoFocus
            multiline
            fullWidth
            rows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackDialog;
