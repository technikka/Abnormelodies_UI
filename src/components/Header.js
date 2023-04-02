import AppMenu from "./AppMenu";
import { useTheme } from "@mui/material/styles";
import logo from "../abnormelodies-logo-plain.svg";

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
      <AppMenu sendFeedback={props.sendFeedback} />
      <img src={logo} style={{width: "300px"}}/>
    </div>
  );
};

export default Header;
