import React from "react";

const ControlsComponent = ({
  objects,
  speeds,
  setObjects,
  setSpeeds,
  isChecked,
}) => {

  const toggleObject = (index) => {
    const newObjects = [...objects];
    newObjects[index] = !newObjects[index];
    setObjects(newObjects);
  };

  const handleSliderChange = (index, event) => {
    const newSpeeds = [...speeds];

    if (isChecked) {
      const newValus = parseFloat(event.target.value);
      if (index === 0) {
        newSpeeds[0] = newValus;
      } else {
        newSpeeds[1] = 0;
        newSpeeds[2] = 0;
      }
      if (index === 1) {
        newSpeeds[1] = newValus;
      } else {
        newSpeeds[0] = 0;
        newSpeeds[2] = 0;
      }
      if (index === 2) {
        newSpeeds[2] = newValus;
      } else {
        newSpeeds[0] = 0;
        newSpeeds[1] = 0;
      }
    } else {
      newSpeeds[index] = parseFloat(event.target.value);
    }
    setSpeeds(newSpeeds);
  };

  const handleInputChange = (index, event) => {
    let value = parseFloat(event.target.value);

    if (value <= 0.1) {
      if (value < 0) value = 0;
      const newSpeeds = [...speeds];
      newSpeeds[index] = value;
      setSpeeds(newSpeeds);
    } else {
      window.alert("Please enter a value between 0 and 0.1");
    }
  };

  return (
    <div className="controls">
      {["dodecahedron", "torus", "box"].map((object, index) => (
        <div key={index} className="control-group">
          <button onClick={() => toggleObject(index)}>Toggle {object}</button>
          <p>Rotation speed :</p>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.01"
              value={speeds[index]}
              onChange={(event) => handleSliderChange(index, event)}
            />
            <input
              type="number"
              min="0"
              step={"0.01"}
              value={speeds[index]}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ControlsComponent;
