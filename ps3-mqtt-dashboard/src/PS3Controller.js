import React, { useRef, useState, useEffect } from "react";
import PS3ControllerSvg from "./PS3ControllerSvg.js";

//This is a function that returns the PS3Controller componenet. It has the data (directionFlags, namedFlags, leftAnalogHoriz, leftAnalogVert, rightAnalogHoriz, rightAnalogVert),
//passed in from the App container, and performs the neccessary logic to modify the PS3ControllerSvg to mimic the inputs from the physical PS3 controller
export default function PS3Controller({directionFlags, namedFlags, leftAnalogHoriz, leftAnalogVert, rightAnalogHoriz, rightAnalogVert}) {
  //Here, we declare the various limits for the analog sticks
  //The actual inputs vary a little bit even when the controller is inactive, so this prevents us from performing to many renders and crashing the system
  const upperLimVert = 130;
  const lowerLimVert = 120;
  const upperLimHoriz = 140;
  const lowerLimHoriz = 130;

  //These are a series of hooks. Each hook gets an initial value corresponding to the inactive state for the various buttons and analog sticks
  //Each hook declares a variable and a setter method for updating state. Any change in state forces a re-render in the browser
  //The buttons use booleans and the analog sticks get an integer the corresponds to axis center for both horizontal and vertical alignment
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

  //Below we have a second set of hooks. These hooks essentially monitor an input prop for changes (indicated by the square brackets which are the second param to useEffect)
  //and then perform the callback function (the first param to useEffect), to update the internal state of the component based on the property changes

  //This first useEffect hook monitors the directionFlags input (Left, Right, Up, Down as well as Start and Select), and sets the variable flags according to the bit flags, forcing the component to re-render and display the inputs from the controller
  useEffect(() => {
    directionFlags[0] === '1' ? setDirLeft(true) : setDirLeft(false);
    directionFlags[1] === '1' ? setDirDown(true) : setDirDown(false);
    directionFlags[2] === '1' ? setDirRight(true) : setDirRight(false);
    directionFlags[3] === '1' ? setDirUp(true) : setDirUp(false);
    directionFlags[4] === '1' ? setStart(true) : setStart(false);
    directionFlags[7] === '1' ? setSelect(true) : setSelect(false);
  }, [directionFlags])

  //This second hook monitors the namedFlags (X, Square, Circle, Triangle buttons), updating flags accordingly
  useEffect(() => {
    namedFlags[0] === '1' ? setBtnLeft(true) : setBtnLeft(false);
    namedFlags[1] === '1' ? setBtnDown(true) : setBtnDown(false);
    namedFlags[2] === '1' ? setBtnRight(true) : setBtnRight(false);
    namedFlags[3] === '1' ? setBtnUp(true) : setBtnUp(false);
  }, [namedFlags])

  //This third hook monitors the leftAnalog inputs, first we go ahead and update the integer inputs corresponding to position
  //Second, we use the limit constants declared above to see if we have moved the analog enough that we want to render the change, assuming we have, we set the binary flag for the analog
  useEffect(() => {
    setLeftHoriz(leftAnalogHoriz);
    setLeftVert(leftAnalogVert);
    if(analogLeft === false && leftAnalogHoriz < lowerLimHoriz || leftAnalogHoriz > upperLimHoriz || leftAnalogVert < lowerLimVert || leftAnalogVert > upperLimVert) {
      setAnalogLeft(true);
    } else if(analogLeft === true) setAnalogLeft(false);
  }, [leftAnalogHoriz, leftAnalogVert])

  //This fourth hook monitors the right analog stick, in the same manner as the hook for the left analog above
  useEffect(() => {
    setRightHoriz(rightAnalogHoriz);
    setRightVert(rightAnalogVert);
    if(analogRight === false && rightAnalogHoriz < lowerLimHoriz || rightAnalogHoriz > upperLimHoriz || rightAnalogVert < lowerLimVert || rightAnalogVert > upperLimVert) {
      setAnalogRight(true);
    } else if(analogRight === true) setAnalogRight(false);
  }, [rightAnalogHoriz, rightAnalogVert])

  //This helper method compares the axis position to the lower and upper limits, and returns the general position of the joystick on the vertical plane
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

  //This helper method compares the axis position to the lower and upper limits, and returns the general position of the joystick on the horizontal plane
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

  //This return statement is the actual component itself. It contains a wrapping div, and the PS3ControllerSvg component. The component takes in all the flags and variables
  //declared above as properties such that they can be rendered. Any change to those properties forces a re-render
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
