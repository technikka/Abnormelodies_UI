import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { errorData } from "../Data";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const theme = useTheme();
  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const [feedbackText, setFeedbackText] = useState("");
  const charCount = feedbackText.length;

  const [errorCode, setErrorCode] = useState("");
  const [success, setSuccess] = useState(false);

  const textfieldRef = useRef(null);
  const captchaRef = useRef(null);

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
    setErrorCode("");
    setFeedbackText(event.target.value);
  };

  const handleSubmit =  async () => {
    if (validateMinChars() && validateMaxChars()) {
      const token = captchaRef.current.getValue();

      let APIResponse;
      if (token) {
        try {
          APIResponse =  await axios.post("http://localhost:3001/api/v1/feedbacks/validate_token", {
            recaptcha_token: token,
          });
        } catch (error) {
          console.log(error)
        }
        if (APIResponse && APIResponse.status === 200) {
          props.sendFeedback(feedbackText);
          setSuccess(true);
        } else {
          setErrorCode("499");
        }

        captchaRef.current.reset();

      } else {
        setErrorCode("498");
      }
      
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
            <DialogContentText style={{marginBottom: "10px"}}>
              Found a bug? Corrections on my use of music theory? Suggestions for improvement? Features you'd like to see added? All feedback is welcome!
            </DialogContentText>
            <TextField
              onPaste={handleChange}
              onCut={handleChange}
              onChange={handleChange}
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              error={errorCode.length > 0 && errorCode != "498" && errorCode != "499"}
              inputRef={textfieldRef}
            />

            <div style={{height: "26px"}}>
              { errorCode.length > 0 &&
                <FormHelperText
                  role="alert"
                  aria-live="assertive"
                  error
                  style={{
                    maxWidth: "inherit"
                  }}
                >
                  {errorMessage()}
                </FormHelperText>
              }
            </div>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
                style={mobile ? {transform: "scale(0.85)", transformOrigin: "0 0"} : {}}
              />
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
