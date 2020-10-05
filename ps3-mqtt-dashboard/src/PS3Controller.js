import React, { useRef, useState } from "react";
import PS3ControllerSvg from "./PS3ControllerSvg.js";


export default function GamepadController() {
  const [gamepads, setGamepads] = useState({});
  const calcDirectionVertical = (axe) => {
    // Up
    if (axe < -0.2) {
      return "up";
    }
    // Down
    if (axe > 0.2) {
      return "down";
    }
  };

  const calcDirectionHorizontal = (axe) => {
    // Left
    if (axe < -0.2) {
      return "left";
    }
    // Right
    if (axe > 0.2) {
      return "right";
    }
  };
  return (
    <div
      className="Gamepads"
      style={{ position: "fixed", bottom: 0, right: 0 }}
    >
          <PS3ControllerSvg
            directionUp={false}
            directionDown={false}
            directionLeft={false}
            directionRight={false}
            buttonDown={false}
            buttonRight={false}
            buttonLeft={false}
            buttonUp={false}
            select={false}
            start={true}
            analogLeft={false}
            analogRight={false}
            analogLeftDirection={[
              calcDirectionHorizontal(0.0),
              calcDirectionVertical(0.0)
            ]}
            analogRightDirection={[
              calcDirectionHorizontal(0.0),
              calcDirectionVertical(0.0)
            ]}
          />
    </div>
  );
}
