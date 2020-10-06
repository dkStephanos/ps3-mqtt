import React, { useRef, useState, useEffect } from "react";
import PS3ControllerSvg from "./PS3ControllerSvg.js";


export default function PS3Controller({directionFlags, namedFlags, leftAnalogHoriz, leftAnalogVert, rightAnalogHoriz, rightAnalogVert}) {
  const upperLimVert = 130;
  const lowerLimVert = 120;
  const upperLimHoriz = 140;
  const lowerLimHoriz = 130;

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
  const [analogLeft, setAnalogLeft] = useState(false);
  const [analogRight, setAnalogRight] = useState(false);
  const [leftHoriz, setLeftHoriz] = useState(135);
  const [leftVert, setLeftVert] = useState(125);
  const [rightHoriz, setRightHoriz] = useState(135);
  const [rightVert, setRightVert] = useState(125);

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

  useEffect(() => {
    setLeftHoriz(leftAnalogHoriz);
    setLeftVert(leftAnalogVert);
    if(analogLeft === false && leftAnalogHoriz < lowerLimHoriz || leftAnalogHoriz > upperLimHoriz || leftAnalogVert < lowerLimVert || leftAnalogVert > upperLimVert) {
      setAnalogLeft(true);
    } else if(analogLeft === true) setAnalogLeft(false);
  }, [leftAnalogHoriz, leftAnalogVert])

  useEffect(() => {
    setRightHoriz(rightAnalogHoriz);
    setRightVert(rightAnalogVert);
    if(analogRight === false && rightAnalogHoriz < lowerLimHoriz || rightAnalogHoriz > upperLimHoriz || rightAnalogVert < lowerLimVert || rightAnalogVert > upperLimVert) {
      setAnalogRight(true);
    } else if(analogRight === true) setAnalogRight(false);
  }, [rightAnalogHoriz, rightAnalogVert])

  const calcDirectionVertical = (axe) => {
    // Up
    if (axe < lowerLimVert) {
      return "up";
    }
    // Down
    if (axe > upperLimVert) {
      return "down";
    }
  };

  const calcDirectionHorizontal = (axe) => {
    // Left
    if (axe < lowerLimHoriz) {
      return "left";
    }
    // Right
    if (axe > upperLimHoriz) {
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
            analogLeft={analogLeft}
            analogRight={analogRight}
            analogLeftDirection={[
              calcDirectionHorizontal(leftHoriz),
              calcDirectionVertical(leftVert)
            ]}
            analogRightDirection={[
              calcDirectionHorizontal(rightHoriz),
              calcDirectionVertical(rightVert)
            ]}
          />
    </div>
  );
}
