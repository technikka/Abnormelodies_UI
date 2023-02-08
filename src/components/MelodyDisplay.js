import { useEffect, useRef } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

const MelodyDisplay = (props) => {
  const melody = props.xml;

  const options = {
    backend: "svg",
    drawTitle: false,
    drawPartNames: false,
    drawMeasureNumbers: false,
    autoBeam: false,
  };

  const osmd = useRef(null);

  const createDisplay = () => {
    osmd.current = new OpenSheetMusicDisplay("osmdContainer", options);
  };

  useEffect(() => {
    createDisplay();
  }, []);

  useEffect(() => {
    updateDisplay();
  }, [melody]);

  const updateDisplay = () => {
    osmd.current.load(melody).then(() => osmd.current.render());
  };

  return <div id="osmdContainer"></div>;
};

export default MelodyDisplay;
