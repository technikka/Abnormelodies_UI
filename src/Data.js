const errorData = [
  {
    code: "123",
    error: "invalid register",
    message: "There are no notes in that register range.",
  },
  {
    code: "421",
    error: "invalid note minimum",
    message: "You must select at least one note type to allow.",
  },
  {
    // for half note, dot selection CAN resolve error
    code: "344",
    error: "invalid duration fit",
    message:
      "You must allow one of the following durations to accompany a half note in 3/4 time: 1/8 (note or rest), 1/4 (note or rest), or allow dots.",
  },
  {
    // for triplets, dot selection CANNOT resolve error
    code: "333",
    error: "invalid duration fit",
    message:
    "You must allow one of the following durations to accompany a triplet in 3/4 time: 1/8 (note or rest), 1/4 (note or rest).",
  },
];

const majorTonics = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Fs",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const minorTonics = [
  "C",
  "Cs",
  "D",
  "Ds",
  "Eb",
  "E",
  "F",
  "Fs",
  "G",
  "Gs",
  "A",
  "Bb",
  "B",
];

const chromaticScale = [
  "Bs_C",
  "Cs_Db",
  "D",
  "Ds_Eb",
  "E",
  "Es_F",
  "Fs_Gb",
  "G",
  "Gs_Ab",
  "A",
  "As_Bb",
  "B_Cb",
];

const majorPattern = [1, 1, 0, 1, 1, 1, 0];
const naturalMinorPattern = [1, 0, 1, 1, 0, 1, 1];

const scale_pattern = (mode) => {
  return (
    mode === "major" ? majorPattern : naturalMinorPattern
  )
}

// determine if sharp, flat, or natural pitch.
const alter = (pitches, tonic) => {
  let step = tonic[0];
  return pitches.map((pitch, index) => {
    if (pitch.length > 2) {
      let alters = pitch.split("_");
      if (index === 0) {
        if (alters[0] === tonic) {
          return alters[0];
        } else {
          return alters[1];
        }
      }
      if (alters[0].includes(step)) {
        step = alters[1][0];
        return alters[1];
      } else {
        step = alters[0][0];
        return alters[0];
      }
    }
    step = pitch;
    return pitch;
  });
};

const chromaticIndexStart = (tonic) => {
  const index = chromaticScale.indexOf(tonic);
  if (index > 0) {
    return index
  }
  return (
    chromaticScale.indexOf(
      chromaticScale.find(
        string => string.includes(tonic)
      )
    )
  )
}

const getPitches = (tonic, scale_pattern) => {
  let notes = [];
  let marker = chromaticIndexStart(tonic);

  scale_pattern.forEach((entry) => {
    notes.push(chromaticScale[marker]);
    if (entry === 1) {
      marker += 2;
    } else {
      marker += 1;
    }
    if (marker > chromaticScale.length - 1) {
      marker -= chromaticScale.length;
    }
  });
  return notes;
};

const getScale = (tonic, mode) => {
  const pitches = getPitches(tonic, scale_pattern(mode))
  return(alter(pitches, tonic));
};

export { majorTonics, minorTonics, errorData, getScale };
