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
import { Alert, AlertTitle } from '@mui/material';

const App = () => {
  const [melodyXML, setMelodyXML] = useState({});
  const [melodyFragments, setMelodyFragments] = useState([]);
  const melodyMounted = useRef(false);
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#55185d", // purple
      },
      secondary: {
        main: "#ecb602", // yellow
      },
      tertiary: {
        // main: "#CE653C" // salmon-ish
        // main: "#BC4662" // pink
        main: "#366989",
      },
      background: {
        main: "#e9e9e9"
      } 
    },
    // gridContainerStyle: {
    //   display: "inline-block",
    //   backgroundColor: "#CE653C", // salmon-ish
    //   // backgroundColor: "#f2de99", // light yellow
    //   // backgroundColor: "#BC4662", // pink
    // },
    itemContainerStyle: {
      backgroundColor: "#f7f7f7",
      // margin: "0.3em",
      padding: "0 .6em .6em .6em",
      borderRadius: "4px",
      display: "inline-grid",
      justifyItems: "center",
      height: "109px"
    },
    itemLabelContainerStyle: {
      display: "grid", 
      gridTemplateColumns: "1fr auto",
      gridAutoFlow: "column", 
      gridAutoColumns: "auto",
      alignItems: "center", 
      height: "40px",
    },
    audioControlStyle: {
      margin: "0.3em",
      padding: "0 .6em .6em .6em",
      borderRadius: "4px",
      display: "inline-grid",
      justifyItems: "center",
    },
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
    <div>
      <ThemeProvider theme={theme}>
        <Header 
          sendFeedback={sendFeedback}
        />
        <Form getMelody={getMelody}/>
        { alertIsVisible && 
          <Alert severity="error" sx={{my:2}}>
            <AlertTitle>Error</AlertTitle>
            Something unexpected occured while generating a melody. Refresh the page and try again.
          </Alert> 
        }
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
