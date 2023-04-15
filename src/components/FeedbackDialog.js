import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { errorData } from "../Data";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormHelperText,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";

const FeedbackDialog = (props) => {
  const feedbackText = useRef("");
  const charCount = feedbackText.current.length;

  const [errorCode, setErrorCode] = useState("");
  const [success, setSuccess] = useState(false);

  const textfieldRef = useRef(null);

  useEffect(() => {
    textfieldRef.current.focus();
  }, [])

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    props.setOpen(false);
  };

  const validateMaxChars = () => {
    if (charCount >= 3000) {
      setErrorCode("533");
      return false
    };
    return true
  };

  const validateMinChars = () => {
    if (charCount === 0) {
      setErrorCode("500");
      return false
    } else if (charCount < 2) {
      setErrorCode("521");
      return false
    };
    return true
  };

  const handleChange = (event) => {
    feedbackText.current = event.target.value;
  };

  const handleSubmit = () => {
    if (validateMinChars() && validateMaxChars()) {
      props.sendFeedback(feedbackText);
      setSuccess(true);
    }
  };

  const errorMessage = () => {
    let entry = errorData.find((error) => error.code === errorCode);
    if (entry) {
      return entry.message;
    }
  };

  return (
    <div>
      {!success && (
        <Dialog open={props.open} onClose={handleClose} disablePortal>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Found a bug? Suggestions for improvement? Corrections on my use of
              music theory? Features you'd like to see added? All feedback is
              welcome!
            </DialogContentText>
            <TextField
              onPaste={handleChange}
              onCut={handleChange}
              onChange={handleChange}
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              error={errorCode.length > 0}
              inputRef={textfieldRef}
            />
            {errorCode.length > 0 && <FormHelperText role="alert" aria-live="assertive" error>{errorMessage()}</FormHelperText>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Send</Button>
          </DialogActions>
        </Dialog>
      )}
      {success && (
        <Dialog open={props.open} onClose={handleSuccessClose}>
          <Alert
            role="alert" 
            aria-live="polite"
            severity="success"
            variant="outlined"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleSuccessClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Feedback Sent!</AlertTitle>
            Thank you for taking a moment to help improve this app.
          </Alert>
        </Dialog>
      )}
    </div>
  );
};

export default FeedbackDialog;
