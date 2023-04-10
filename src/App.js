import { useState, useRef } from "react";
import "./styles/App.css";
import Form from "./components/Form";
import axios from "axios";
import MelodyDisplay from "./components/MelodyDisplay";
import FragmentService from "./FragmentService";
import MelodyAudio from "./components/MelodyAudio";
import Header from "./components/Header";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import { Alert, AlertTitle } from '@mui/material';

const App = () => {
  const [melodyXML, setMelodyXML] = useState({});
  const [melodyFragments, setMelodyFragments] = useState([]);
  const melodyMounted = useRef(false);
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const yellow80 = "#fbf0cc";
  const yellow70 = "#f9e9b3";
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
        main: backgroundColor
      }, 
    },
    itemContainerStyle: {
      backgroundColor: "#f7f7f7",
      padding: `0 ${itemContainerSpacing} ${itemContainerSpacing} ${itemContainerSpacing}`,
      borderRadius: itemContainerRadius,
      display: "inline-grid",
      gridTemplateRows: "40px, 1fr",
      gridAutoRows: "auto",
      // height: "120px",
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
      borderRadius: `${itemContainerRadius} ${itemContainerRadius} 0 0`
    },
    itemLabelStyle: {
      fontSize: "0.8rem",
      fontWeight: "500",
    },
    itemControlStyle: {
      height: "100%", 
      display: "inline-grid", 
      alignItems: "center",
    },

    audioControlStyle: {
      margin: "0.3em",
      padding: "0 .6em .6em .6em",
      borderRadius: "4px",
      display: "inline-grid",
      justifyItems: "center",
    },

    audioControlLabelContainerStyle: {
      display: "grid", 
      gridTemplateColumns: "auto auto",
      gridAutoFlow: "column", 
      gridAutoColumns: "auto",
      alignItems: "center",
    }
  })

  const mountMelody = () => {
    melodyMounted.current = true;
  };

  const getMelody = (params) => {
    axios
      .get("http://localhost:3001/api/v1/melodies", {
        params: params,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/xml",
        },
      })
      .then((response) => {
        setMelodyXML(response.data);
        const fragments = FragmentService.getFragments(response.data);
        setMelodyFragments(fragments);
        mountMelody();
        setAlertIsVisible(false);
      })
      .catch((error) => {
        console.log(error)
        setAlertIsVisible(true);
        setTimeout(() => {
          setAlertIsVisible(false)
        }, 10000);
      });
  };

  const sendFeedback = (text) => {
    axios
      .post("http://localhost:3001/api/v1/feedbacks", {
        body: text,
      })
      .then((response) => {
        console.log(response);
      })
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
      }}>
      <ThemeProvider theme={theme}>
        <div>
          <div
            // empty div to create top margin
            style={{
              height: "10px",
              width: "100%",
              backgroundColor
            }}>
          </div>
          <Header
            sendFeedback={sendFeedback}
          />
          <Form getMelody={getMelody}/>
          { alertIsVisible &&
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something unexpected occured while generating a melody. Refresh the page and try again.
            </Alert>
          }
        </div>
        { melodyMounted.current && 
          <MelodyDisplay xml={melodyXML}/> 
        }
        { melodyMounted.current && (
          <MelodyAudio melodyFragments={melodyFragments} />
        ) 
        }
      </ThemeProvider>
    </div>
  );
};

export default App;
