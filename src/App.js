import "./App.css";
import Canvas2DComponent from "./Canvas2DComponent";
import CanvasComponent from "./CanvasComponent";
import ControlsComponent from "./ControlsComponent";
import { useState } from "react";

function App() {
  const [objects, setObjects] = useState([true, true, true]);
  const [speeds, setSpeeds] = useState([0, 0, 0]);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setSpeeds([0, 0, 0]);
    }
  };
 

  return (
    <div>
      <div className="toggleSection">
        <input
          type="checkbox"
          id="toggle"
          className="toggleCheckbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <label htmlFor="toggle" className="toggleContainer">
          <div>3D</div>
          <div>2D</div>
        </label>
      </div>
      <ControlsComponent
        objects={objects}
        speeds={speeds}
        setObjects={setObjects}
        setSpeeds={setSpeeds}
        isChecked={isChecked}
      />
      {isChecked ? (
        <Canvas2DComponent objects={objects} speeds={speeds} />
      ) : (
        <CanvasComponent objects={objects} speeds={speeds} />
      )}
    </div>
  );
}

export default App;
