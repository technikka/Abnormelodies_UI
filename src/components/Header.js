import HeaderModal from "./HeaderModal";
import FeedbackDialog from "./FeedbackDialog";

const Header = (props) => {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
  }

  return (
    <div className="header-container" style={containerStyle}>
      <h1>abnormelodies</h1>
      <HeaderModal />
      <FeedbackDialog 
        sendFeedback={props.sendFeedback}
      />
    </div>
  )
}

export default Header;