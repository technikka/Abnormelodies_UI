import TooltipIcon from "../icons/TooltipIcon";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FourFourIcon from "../icons/FourFourIcon";
import ThreeFourIcon from "../icons/ThreeFourIcon";
import SixEightIcon from "../icons/SixEightIcon";
import NoteWholeIcon from "../icons/NoteWholeIcon";
import NoteHalfIcon from "../icons/NoteHalfIcon";
import NoteQuarterIcon from "../icons/NoteQuarterIcon";
import NoteEighthIcon from "../icons/NoteEighthIcon";
import NoteTripletIcon from "../icons/NoteTripletIcon";
import DotIcon from "../icons/DotIcon";
import TieIcon from "../icons/TieIcon";
import RestWholeIcon from "../icons/RestWholeIcon";
import RestHalfIcon from "../icons/RestHalfIcon";
import RestQuarterIcon from "../icons/RestQuarterIcon";
import RestEighthIcon from "../icons/RestEighthIcon";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";

const GuideModal = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const theme = useTheme();

  const keywordHeaderStyle = {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  };

  const keywordInnerStyle = {
    fontWeight: "bold",
    color: theme.palette.tertiary.main,
  };

  const timeSigStyle = {
    color: theme.palette.tertiary.main,
    margin: "-5px 0 0 -3px",
    verticalAlign: "bottom",
  };

  const backgroundStyle = {
    backgroundColor: theme.palette.background.main,
    width: "100%",
    borderRadius: "4px",
    padding: "5px",
    margin: "5px 0",
  };

  const durationIconStyle = {
    display: "inline-block",
    verticalAlign: "sub",
    paddingRight: "5px",
  };

  const tooltipIconStyle = {
    marginRight: "5px",
    verticalAlign: "bottom",
  };

  const errorTip = () => {
    return (
      <ErrorOutlineOutlinedIcon
        fontSize="small"
        style={{
          display: "inline-block",
          verticalAlign: "sub",
          color: theme.palette.error.main,
          paddingRight: "3px",
        }}
      />
    );
  };

  return (
    <Grid>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "start",
            }}
          >
            <Typography variant="h6" mb={2} style={{ display: "inline-block" }}>
              Melody Parameters
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="close guide"
              style={{ display: "inline-block", color: "rgba(0, 0, 0, 0.87)" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Key</span> indicates the
                group of notes that will form the melody, e.g., C Major will use notes C, D, E, F, G, A, and B.
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <span style={keywordInnerStyle}>Scale</span> indicates the
                  pattern, or <i>steps</i> used in grouping the notes. The
                  selected scale affects the tonic options.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <span style={keywordInnerStyle}>Tonic</span> refers to the
                  first note in the scale, creating the tonal center— sort of a
                  home base, the stable note.{" "}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Register</span> refers to the{" "}
                <i>range</i> of the notes, or pitches. A higher register indicates a
                higher pitch; C4 is an octave above C3, e.g., selecting C3 to C5
                will allow C3, D3, E3 and so on; C4, D4, E4 and so on.
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  {errorTip()}Order matters. C begins each new octave: C D E F G
                  A B; selecting A3 to C3 would be nonsensical, but A3 to C4 would include A3, B3, and C4.
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Note Types</span>
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <NoteEighthIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Eighth</span> notes equal one
                  eighth (1/8) the duration of a whole note.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteQuarterIcon
                    style={{ ...durationIconStyle, ...{ paddingRight: "0" } }}
                  />{" "}
                  <span style={keywordInnerStyle}>Quarter</span> notes equal one
                  quarter (1/4) the duration of a whole note, or double that of
                  an eighth note.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteHalfIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Half</span> notes equal one
                  half (1/2) the duration of a whole note, or double that of a
                  quarter note.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteWholeIcon
                    fontSize="small"
                    style={{ ...durationIconStyle, ...{ paddingRight: "8px" } }}
                  />
                  <span style={keywordInnerStyle}>Whole</span> notes are equal
                  to the duration of 8 eighth notes, or 4 quarter notes, or 2
                  half notes.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <NoteTripletIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Triplet</span> sets are
                  durationally equivalent to a half note here (there are other
                  types not currently implemented in this version of
                  abnormelodies). A triplet creates a unique pattern by fitting
                  three notes into the space of two notes (two quarter notes here).
                </Grid>
              </Grid>
              <Grid item>
                <span style={keywordHeaderStyle}>Measures</span> are the
                individual sections of a piece, separated by a bar line,
                featuring a specific number of beats. The amount of beats that
                make up a measure are indicated by the Time Signature.
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Time Signature</span> indicates
                how many beats are in each measure with its upper numeral, and
                indicates which note type equals 1 beat with its lower numeral.
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item container style={backgroundStyle} rowSpacing={0.5}>
                  <Grid item container alignItems="center">
                    <span>
                      <FourFourIcon style={timeSigStyle} />
                      time gets 4 quarter notes per measure.
                    </span>
                  </Grid>
                </Grid>
                <Grid item container style={backgroundStyle} rowSpacing={0.5}>
                  <Grid item container alignItems="center">
                    <span>
                      <ThreeFourIcon style={timeSigStyle} />
                      time gets 3 quarter notes per measure.
                    </span>
                  </Grid>
                  <Grid item>
                    {errorTip()}Whole notes are not allowed; a whole note equals
                    4 beats and a measure is only 3 beats here. To allow a
                    duration of 4 beats, see below how <i>ties</i> work.
                  </Grid>
                  <Grid item>
                    {errorTip()}Half notes are allowed only if at least one of
                    the following types are also selected: eighth or quarter
                    note, eighth or quarter rest, or a dot.
                  </Grid>
                  <Grid item>
                    {errorTip()} Triplets, the durational equivalent of a half
                    note, are allowed only if at least one of the following
                    types are also selected: eighth or quarter note, eighth or
                    quarter rest. (Dotted triplets will be implemented in a
                    later version.)
                  </Grid>
                </Grid>
                <Grid item container style={backgroundStyle} rowSpacing={0.5}>
                  <Grid item container alignItems="center">
                    <span>
                      <SixEightIcon style={timeSigStyle} />
                      time gets 6 eighth notes per measure.
                    </span>
                  </Grid>
                  <Grid item>
                    {errorTip()}Whole notes are not allowed; a whole note would
                    equal 8 beats and a measure is only 6 beats here.
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Augmentations</span>
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <DotIcon fontSize="small" style={durationIconStyle} />{" "}
                  <span style={keywordInnerStyle}>Dots</span> extend the
                  duration of the note they trail, by one half (1/2) that note's
                  value, e.g., in 4/4 time, a dotted quarter note equals 1
                  &#189; beats. 1 beat (the value of the quarter note) + 1/2
                  beat (half the value of the quarter note).
                </Grid>
                <Grid item style={backgroundStyle}>
                  <TieIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Ties</span> connect two notes
                  of the same pitch to create one duration, e.g., two quarter notes
                  tied together play as a half note. Ties are useful in
                  situations where such a duration isn't normally possible,
                  i.e., allowing a duration to cross a barline.
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Rest Types</span>
              </Grid>
              <Grid item container spacing={1} ml={1} direction="column">
                <Grid item style={backgroundStyle}>
                  <RestEighthIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Eighth</span> rests equal one
                  eighth (1/8) the duration of a whole rest.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestQuarterIcon style={durationIconStyle} />
                  <span style={keywordInnerStyle}>Quarter</span> rests equal one
                  quarter (1/4) the duration of a whole rest, or double that of
                  an eighth rest.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestHalfIcon style={durationIconStyle} />{" "}
                  <span style={keywordInnerStyle}>Half</span> rests equal one
                  half (1/2) the duration of a whole rest, or double that of a
                  quarter rest.
                </Grid>
                <Grid item style={backgroundStyle}>
                  <RestWholeIcon style={durationIconStyle} />{" "}
                  <span style={keywordInnerStyle}>Whole</span> rests are equal
                  to the duration of 8 eighth rests, or 4 quarter rests, or 2
                  half rests. (Technically, a whole rest can be used in notation
                  to indicate a break for an entire measure regardless of beats.
                  In this version of abnormelodies, it's always the durational
                  equivalent of a whole note.)
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item>
                <span style={keywordHeaderStyle}>Additional Features</span>{" "}
                apply rules and patterns that influence the process of melody
                generation. *Many more to come!
              </Grid>
              <Grid item container spacing={1} ml={1}>
                <Grid item style={backgroundStyle}>
                  <span style={keywordInnerStyle}>Smooth Resolve</span>{" "}
                  influences the generator to prefer longer durations near the
                  end of a melody which creates the smooth resolution our ears
                  have come to expect of a melody.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              margin: "15px 0",
            }}
          >
            <span>
              Access quick tips on the controls through{" "}
              <TooltipIcon style={tooltipIconStyle} />
              buttons.
            </span>
          </Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default GuideModal;