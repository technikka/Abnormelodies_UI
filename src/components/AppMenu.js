import { useState, useRef } from "react";
import GuideModal from "./GuideModal";
import FeedbackDialog from "./FeedbackDialog";
import MenuIcon from '@mui/icons-material/Menu';
import FeedbackIcon from "@mui/icons-material/Feedback";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { 
  IconButton,
  Popper,
  ClickAwayListener,
  Paper,
  Grow,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText, 
} from '@mui/material';

const AppMenu = (props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleClickFeedback = () => {
    setFeedbackOpen(true);
  }

  const [guideOpen, setGuideOpen] = useState(false);

  const handleClickGuide = () => {
    setGuideOpen(true);
  }

  return(
    <div>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        aria-controls={open ? 'open-menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{
          padding: "0", 
          margin: "6px 0 0 0",
        }}
      >
        <MenuIcon fontSize="large" color="primary"/>
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
            <Paper sx={{marginTop: "5px"}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  aria-labelledby="open-menu-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleClickGuide}
                  >
                    <ListItemIcon>
                      <TipsAndUpdatesIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText>
                      Guide
                    </ListItemText>
                  </MenuItem>
                  <GuideModal
                    open={guideOpen}
                    setOpen={setGuideOpen}
                    toggleAppMenu={handleToggle}
                  />
                  <MenuItem
                    onClick={handleClickFeedback}
                  >
                    <ListItemIcon>
                      <FeedbackIcon color="tertiary"/>
                    </ListItemIcon>
                    <ListItemText>
                      Feedback
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      { feedbackOpen && 
        <FeedbackDialog
          sendFeedback={props.sendFeedback}
          open={feedbackOpen}
          setOpen={setFeedbackOpen}
        /> 
      }

    </div>
  )

}

export default AppMenu