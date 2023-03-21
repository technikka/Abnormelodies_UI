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
        main: "#185d55" // turquoise
      } 
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Form getMelody={getMelody}/>
        { melodyMounted.current && (
          <MelodyAudio melodyFragments={melodyFragments} />
        ) 
        }
        { alertIsVisible && 
          <Alert severity="error" sx={{my:2}}>
            <AlertTitle>Error</AlertTitle>
            Something unexpected occured while generating a melody. Refresh the page and try again.
          </Alert> 
        }
        { melodyMounted.current && 
          <MelodyDisplay xml={melodyXML}/> 
        }
      </ThemeProvider>
    </div>
  );
};

export default App;
