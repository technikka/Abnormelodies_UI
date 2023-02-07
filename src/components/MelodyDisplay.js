import { useEffect } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

const MelodyDisplay = (props) => {

  const melody = props.xml;

  useEffect(() => {
    updateMelodyDisplay();
  }, [melody]);

  const updateMelodyDisplay = () => {
    document.getElementById("osmdContainer").innerHTML = "";

    const options = {
      backend: 'svg',
      drawTitle: false,
      drawPartNames: false,
      drawMeasureNumbers: false,
      autoBeam: false
    }
    const osmd = new OpenSheetMusicDisplay("osmdContainer", options);

    osmd.load(melody).then(() => osmd.render());
  }

  return (
    <div id="osmdContainer"></div>
  )
}

export default MelodyDisplay