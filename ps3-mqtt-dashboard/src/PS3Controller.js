import React, { useRef, useState, useEffect } from "react";
import PS3ControllerSvg from "./PS3ControllerSvg.js";


export default function PS3Controller({directionFlags, namedFlags}) {
  const [gamepads, setGamepads] = useState({});
  const [dirUp, setDirUp] = useState(false);
  const [dirDown, setDirDown] = useState(false);
  const [dirLeft, setDirLeft] = useState(false);
  const [dirRight, setDirRight] = useState(false);
  const [start, setStart] = useState(false);
  const [select, setSelect] = useState(false);
  const [btnUp, setBtnUp] = useState(false);
  const [btnDown, setBtnDown] = useState(false);
  const [btnLeft, setBtnLeft] = useState(false);
  const [btnRight, setBtnRight] = useState(false);

  useEffect(() => {
    directionFlags[0] === '1' ? setDirLeft(true) : setDirLeft(false);
    directionFlags[1] === '1' ? setDirDown(true) : setDirDown(false);
    directionFlags[2] === '1' ? setDirRight(true) : setDirRight(false);
    directionFlags[3] === '1' ? setDirUp(true) : setDirUp(false);
    directionFlags[4] === '1' ? setStart(true) : setStart(false);
    directionFlags[7] === '1' ? setSelect(true) : setSelect(false);

  }, [directionFlags])

  useEffect(() => {
    namedFlags[0] === '1' ? setBtnLeft(true) : setBtnLeft(false);
    namedFlags[1] === '1' ? setBtnDown(true) : setBtnDown(false);
    namedFlags[2] === '1' ? setBtnRight(true) : setBtnRight(false);
    namedFlags[3] === '1' ? setBtnUp(true) : setBtnUp(false);

  }, [namedFlags])

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
    >
          <PS3ControllerSvg
            directionUp={dirUp}
            directionDown={dirDown}
            directionLeft={dirLeft}
            directionRight={dirRight}
            buttonDown={btnDown}
            buttonRight={btnRight}
            buttonLeft={btnLeft}
            buttonUp={btnUp}
            select={select}
            start={start}
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
