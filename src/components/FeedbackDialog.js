import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedbackDialog = (props) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const validateText = (event) => {
    setFeedbackText(event.target.value);

    if (event.target.value.length >= 3000) {
      setError(true);
    } else {
      setError(false);
    }
  }

  const handleSubmit = () => {
    if (!error) {
      props.sendFeedback(feedbackText);
    }
  }

  return (
    <div>
      <Button
        variant="text"
        startIcon={<FeedbackIcon />}
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
            id="feedback-text"
            onChange={validateText}
            variant="outlined" 
            autoFocus
            multiline
            fullWidth
            rows={6}
            error={error}
          />
          { error &&
            <FormHelperText error>
              Maximum characters exceeded. 3000 character limit. 
            </FormHelperText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedbackDialog;
