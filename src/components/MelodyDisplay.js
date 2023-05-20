import { useEffect, useRef } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { useTheme } from "@mui/material/styles";

const MelodyDisplay = (props) => {
  const theme = useTheme();

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

  // this preps the osmd container with the SVG height, which is necessary to fix "content jumping" while scrolling on mobile.
  const setStyle = () => {
    const svg = document.getElementById('osmdSvgPage1');
    const renderedSVGHeight = `${svg.height.baseVal.value}px`;

    const osmdContainer = document.getElementById('osmdContainer');
    osmdContainer.style.height = renderedSVGHeight;
  }

  useEffect(() => {
    createDisplay();
  }, []);

  useEffect(() => {
    updateDisplay();
  }, [melody]);

  const updateDisplay = () => {
    osmd.current.load(melody)
                .then(() => {
                  osmd.current.render();
                  setStyle();
                });
  };

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: theme.appMaxWidth,
      }}
      id="osmdContainer"
    ></div>
  );
};

export default MelodyDisplay;
