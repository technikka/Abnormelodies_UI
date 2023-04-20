import AppMenu from "./AppMenu";
import logo from "../abnormelodies-logo-robotic.svg";

const Header = (props) => {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    backgroundColor: "inherit",
    paddingLeft: "16px",
    position: "absolute",
    zIndex: "10",
    pointerEvents: "auto"
  };

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
        style={{
          width: "300px",
          marginLeft: "0.8em",
        }}
      />
    </div>
  );
};

export default Header;
