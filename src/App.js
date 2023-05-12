import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import MelodyDisplay from "./components/MelodyDisplay";
import FragmentService from "./FragmentService";
import MelodyAudio from "./components/MelodyAudio";
import Header from "./components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, AlertTitle } from "@mui/material";
import XMLParser from "react-xml-parser";

const App = () => {
  const [melodyXML, setMelodyXML] = useState(null);
  const parsedXML = useRef(null);
  const beatType = useRef('4');
  const [melodyFragments, setMelodyFragments] = useState([]);

  const melodyMounted = useRef(false);

  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const yellow80 = "#fbf0cc";
  const backgroundColor = "#e9e9e9"; // grey

  const itemContainerRadius = "6px";
  const itemContainerSpacing = "0.6em";

  const theme = createTheme({
    palette: {
      primary: {
        main: "#55185d", // purple
      },
      secondary: {
        main: "#ecb602", // yellow0
      },
      tertiary: {
        main: "#366989", // calypso blue
      },
      background: {
        main: backgroundColor,
      },
    },
    breakpoints: {
      mobile: "(max-width: 465px)",
      playControls: "(max-width: 540px)",
      small: "(max-width: 630px)",
    },

    appMaxWidth: "2010px",

    itemContainerStyle: {
      backgroundColor: "#f7f7f7",
      padding: `0 ${itemContainerSpacing} ${itemContainerSpacing} ${itemContainerSpacing}`,
      borderRadius: itemContainerRadius,
      display: "inline-grid",
      gridTemplateRows: "40px, 1fr",
      gridAutoRows: "auto",
      minHeight: "120px",
      border: "1px solid white",
    },
    itemLabelContainerStyle: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gridAutoFlow: "column",
      gridAutoColumns: "auto",
      alignItems: "center",
      height: "40px",
      backgroundColor: yellow80,
      margin: `0 -${itemContainerSpacing}`,
      padding: `0 ${itemContainerSpacing}`,
      borderRadius: `${itemContainerRadius} ${itemContainerRadius} 0 0`,
    },
    itemLabelStyle: {
      fontSize: "0.8rem",
      fontWeight: "500",
      width: "max-content",
    },
    itemControlStyle: {
      height: "100%",
      display: "inline-grid",
      alignItems: "center",
    },
    audioControlStyle: {
      margin: "0.3em",
      padding: "0 .6em .6em .6em",
      display: "inline-grid",
      justifyItems: "center",
    },
    audioControlLabelContainerStyle: {
      display: "grid",
      gridTemplateColumns: "auto auto",
      gridAutoFlow: "column",
      gridAutoColumns: "auto",
      alignItems: "center",
    },
    mobileAudioLabelContainerStyle: {
      marginTop: "0.3em",
      display: "grid",
      justifyItems: "center",
    },
  });

  const mountMelody = () => {
    melodyMounted.current = true;
  };

  useEffect(() => {
    if (melodyXML) {
      parsedXML.current = new XMLParser().parseFromString(melodyXML);
      beatType.current = parsedXML.current.getElementsByTagName("beat-type")[0].value;
      const fragments = FragmentService.getFragments(parsedXML.current);
      setMelodyFragments(fragments);
    }
  }, [melodyXML])


  const getMelody = (params) => {
    axios
      .get("https://api.abnormelodies.com/api/v1/melodies", {
        params: params,
        headers: {
          Accept: "application/xml",
        },
      })
      .then((response) => {
        setMelodyXML(response.data);
        
        
        mountMelody();
        setAlertIsVisible(false);
      })
      .catch((error) => {
        console.log(error);
        setAlertIsVisible(true);
        setTimeout(() => {
          setAlertIsVisible(false);
        }, 10000);
      });
  };

  const getGeoData = async () => {
    let data;
    try {
      data = await axios.get("https://api.ipgeolocation.io/ipgeo", {
        params: {
          apiKey: process.env.REACT_APP_IPGEOLOCATION_KEY,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const feedbackParams = async (text) => {
    const geoData = await getGeoData();
    const params = {};
    params.body = text;
    params.user_agent = navigator.userAgent;

    if (geoData) {
      params.ip_address = geoData.data.ip;
      params.geo_location = `${geoData.data.city}, ${geoData.data.state_prov}, ${geoData.data.country_name}`;
    }
    return params;
  };

  const sendFeedback = async (text) => {
    const params = await feedbackParams(text);
    axios
      .post("https://abnormelodies.onrender.com/api/v1/feedbacks", params)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="app-container"
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr 110px",
        maxWidth: theme.appMaxWidth,
        margin: "0 auto",
        overflowX: "clip",
      }}
    >
      <ThemeProvider theme={theme}>
        <div style={{ width: "100vw" }}>
          <div
            // empty div to create top margin
            style={{
              height: "10px",
              width: "100%",
              maxWidth: theme.appMaxWidth,
              backgroundColor,
            }}
          ></div>
          <Header sendFeedback={sendFeedback} />
          <Form getMelody={getMelody} />
          {alertIsVisible && (
            <Alert severity="error" role="alert" aria-live="assertive">
              <AlertTitle>Error</AlertTitle>
              Something unexpected occured while generating a melody. Refresh
              the page and try again.
            </Alert>
          )}
        </div>
        {melodyMounted.current && <MelodyDisplay xml={melodyXML} />}
        {melodyMounted.current && (
          <MelodyAudio 
            melodyFragments={melodyFragments}
            beatType={beatType.current}
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
