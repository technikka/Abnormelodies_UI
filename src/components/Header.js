import HeaderModal from "./HeaderModal";
import FeedbackDialog from "./FeedbackDialog";

const Header = () => {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
  }

  return (
    <div className="header-container" style={containerStyle}>
      <h1>abnormelodies</h1>
      <HeaderModal />
      <FeedbackDialog />
    </div>
  )
}

export default Header;