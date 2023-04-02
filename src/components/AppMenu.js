import { useState } from "react";
import GuideModal from "./GuideModal";
import FeedbackDialog from "./FeedbackDialog";
import MenuIcon from '@mui/icons-material/Menu';
import FeedbackIcon from "@mui/icons-material/Feedback";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { 
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText, 
} from '@mui/material';

const AppMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

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
        onClick={handleClick}
        aria-controls={open ? 'open-menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{padding: "0", margin: "6px 0 0 0"}}
      >
        <MenuIcon fontSize="large" color="primary"/>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'open-menu-button',
        }}
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
        <FeedbackDialog 
            sendFeedback={props.sendFeedback} 
            open={feedbackOpen} 
            setOpen={setFeedbackOpen}
        />
      </Menu>
    </div>
  )

}

export default AppMenu