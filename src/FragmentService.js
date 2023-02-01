import XMLParser from "react-xml-parser";

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
      if (alter === 1) {
        return "#";
      }
      return "b";
    }
    return "";
  };

  const getPitch = (noteObj) => {
    const pitch = noteObj.children.find((child) => child.name === "pitch");
    // TODO: handle when pitch is undefined
    return step(pitch) + alter(pitch) + octave(pitch);
  };

  const getDuration = (noteObj) => {
    return parseInt(noteObj.children.find((child) => child.name === "duration").value);
  };

  const constructFragment = (noteObj) => {
    let fragment = {};
    fragment["pitch"] = getPitch(noteObj);
    fragment["duration"] = getDuration(noteObj);
    return fragment;
  };

  const getFragments = (melodyXML) => {
    let fragments = [];
    const xmlObj = new XMLParser().parseFromString(melodyXML);
    const noteObjs = xmlObj.getElementsByTagName("Note");
    noteObjs.forEach((noteObj) => {
      fragments.push(constructFragment(noteObj));
    });
    return fragments;
  };

  return { getFragments };
})();

export default FragmentService;
