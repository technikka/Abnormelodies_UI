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
    position: "fixed",
    zIndex: "10",
    paddingLeft: "16px",
  };

  return (
    // The top of the accordion streatches across the header but beneath it, note that it is not included here but in the Form component.
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
