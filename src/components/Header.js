import AppMenu from "./AppMenu";
import logo from "../abnormelodies-logo-robotic.svg";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = (props) => {
  const theme = useTheme();
  // returns true if match found
  const mobile = useMediaQuery(theme.breakpoints.mobile);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    backgroundColor: "inherit",
    paddingLeft: "16px",
    position: "absolute",
    zIndex: "10",
    pointerEvents: "auto"
  };

  const logoStyle = {
    width: "300px",
    marginLeft: "0.8em",
  }

  const mobileLogoStyle = {
    width:"200px",
    marginLeft: "0.5em",
    alignSelf: "center"
  }

  return (
    // The top of the accordion streatches across the header but beneath it, note that it is not included here but in the Form component.
    <div className="header-container" style={containerStyle}>
      <AppMenu 
        sendFeedback={props.sendFeedback}
        verifyCaptchaToken={props.verifyCaptchaToken}
      />
      <img
        src={logo}
        alt="abnormelodies logo"
        style={mobile ? mobileLogoStyle : logoStyle}
      />
    </div>
  );
};

export default Header;
