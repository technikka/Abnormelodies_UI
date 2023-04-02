import AppMenu from "./AppMenu";
import { useTheme } from "@mui/material/styles";
import logo from "../abnormelodies-logo-plain.svg";

const Header = (props) => {
  const theme = useTheme();

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    backgroundColor: theme.palette.background.main,
    // width: "m-content", 
    position: "fixed",
    // left: "16px", 
    zIndex: "10",
    padding: "0 0 7px 16px",
  };

  return (
    <div className="header-container" style={containerStyle}>
      <AppMenu sendFeedback={props.sendFeedback}/>
      <img
        src={logo}
        style={{
          width: "300px",
          marginLeft: "0.8em",
        }}
      />
    </div>
  );
};

export default Header;
