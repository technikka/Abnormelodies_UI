import HeaderModal from "./HeaderModal";
import FeedbackDialog from "./FeedbackDialog";
import { useTheme } from "@mui/material/styles";
import logo from "../abnormelodies-logo-plain.png";

const Header = (props) => {
  const theme = useTheme();

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
    backgroundColor: theme.palette.background.main,
  };

  return (
    <div className="header-container" style={containerStyle}>
      <img src={logo} style={{width: "300px"}}/>
      <HeaderModal />
      <FeedbackDialog sendFeedback={props.sendFeedback} />
    </div>
  );
};

export default Header;
