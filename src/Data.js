const errorData = [
  {
    code: "123", error: "invalid register", message: "There are no notes in that register range."
  },
  {
    code: "421", error: "invalid note minimum", message: "You must select at least one note type to allow."
  },
  { // for half note, dot selection can resolve error
    code: "344", error: "invalid durational fit", message: "You must additionally allow one of the following types to accompany a half note in 3/4 time: 1/8 note or rest, 1/4 note or rest, or allow dots."
  },
  { // for triplets, dot selection cannot resolve error
    code: "333", error: "invalid duration fit", message: "You must additionally allow one of the following types to accompany a triplet in 3/4 time: 1/8 note or rest, 1/4 note or rest."
  }

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

export { majorTonics, minorTonics, errorData}