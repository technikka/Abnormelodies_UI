const FragmentService = (() => {
  const step = (pitch) => {
    return pitch.children.find((child) => child.name === "step").value;
  };

  const octave = (pitch) => {
    return pitch.children.find((child) => child.name === "octave").value;
  };

  const alter = (pitch) => {
    const alter = pitch.children.find((child) => child.name === "alter")?.value;
    if (alter) {
      if (alter === "1") {
        
        return "#";
      } else if (alter === "-1") {
        return "b";
      }
    }
    return "";
  };

  const getPitch = (noteObj) => {
    const pitch = noteObj.children.find((child) => child.name === "pitch");
    if (pitch) {
      let x = step(pitch) + alter(pitch) + octave(pitch);
      return x
    }
    return 0;
  };

  const getTie = (noteObj) => {
    const isTie = noteObj.getElementsByTagName("Tied")[0];
    if (isTie) {
      return isTie.attributes.type;
    }
  };

  const getDuration = (noteObj) => {
    return parseInt(
      noteObj.children.find((child) => child.name === "duration").value
    );
  };

  const constructFragment = (noteObj) => {
    let fragment = {};
    fragment["pitch"] = getPitch(noteObj);
    fragment["duration"] = getDuration(noteObj);
    const tiedValue = getTie(noteObj);
    if (tiedValue) {
      fragment["tie"] = tiedValue;
    }
    return fragment;
  };

  const getFragments = (parsedMelodyXML) => {
    let fragments = [];
    const noteObjs = parsedMelodyXML.getElementsByTagName("Note");
    noteObjs.forEach((noteObj) => {
      fragments.push(constructFragment(noteObj));
    });
    return fragments;
  };

  return { getFragments };
})();

export default FragmentService;
