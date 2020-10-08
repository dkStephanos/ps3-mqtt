import * as React from "react";

//SVG implementation borrowed from Ryo Suke, https://whoisryosuke.com/blog/2020/adding-game-controller-input-to-react/
//I didn't write this, but it is essentially a function that returns the svg image
//It takes a series of inputs corresponding to the various controls on the ps3 controller

function GamepadSvg({
  buttonLeft,
  buttonUp,
  buttonDown,
  buttonRight,
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
  analogLeft,
  analogRight,
  analogLeftDirection,
  analogRightDirection,
  select,
  start,
  activeColor = "#2F80ED",
  inactiveColor = "#E0E0E0",
  ...props
}) {
  //This function takes the position of the analog and converts it into a css transform for the joystick image
  const createTransform = (direction) => {
    switch (direction) {
      case "up":
        return "translateY(-10px)";
      case "down":
        return "translateY(10px)";
      case "left":
        return "translateX(-10px)";
      case "right":
        return "translateX(10px)";

      default:
        return "";
    }
  };
  return (
    <svg width={288} height={144} viewBox="0 0 1280 819" fill="none" {...props}>
      <path
        className="background"
        d="M209.5 7.246c11.7-2.7 26.5-5.2 38.5-6.6 12.5-1.4 38.5-.4 49 1.8 19.7 4.3 31.2 10.6 43.7 24.1 7.8 8.4 21.9 28.7 25.2 36.4 4.4 10.1 12.6 47.8 12.6 58.3v3.1h522v-3.1c0-5.2 4.8-32.2 7.6-43 3.5-13.1 6-18.6 13.5-29.9 12-17.9 23.6-30.5 33.3-36.2 6.4-3.7 19-8.1 29.2-10.1 11-2.2 40.4-2.5 54.4-.5 26.1 3.6 47.3 9.1 61 15.8 21 10.2 31.8 27.5 41.4 66 1.9 7.6 4 16.3 4.6 19.4l1.1 5.5 11.2 8c29 20.4 53.9 42.9 63.3 57.1 11.4 17.1 20.1 37.4 28.8 67.5 7.1 24.6 7.5 27.6 17.5 138.3 9.3 101.8 11.5 142.5 11.6 213 0 54.6-1.2 87.9-4 110.6-3.5 27.8-13.4 49.3-31.2 68-23.4 24.5-47.6 38.4-78.6 45.1-14.5 3.1-41.5 3.1-53 0-16.6-4.5-33.9-14.7-51.7-30.5-24.5-21.7-42.3-49.1-72.6-111.7-18.2-37.4-19.9-40.6-26.2-47.5-3.1-3.3-8-9.3-10.9-13.2l-5.4-7.3-10.2 8.3c-23.1 18.7-34.4 24.2-60.9 29.8-12.4 2.6-36.9 3.1-48.8 1-27.3-4.8-51.2-13.8-71-26.9-17.2-11.4-27.6-24.6-41.3-52.4l-7.2-14.6H573l-7.2 14.6c-13.7 27.8-24.1 41-41.3 52.4-20.1 13.2-43.7 22.1-71 26.9-11.9 2.1-36.4 1.6-48.8-1-26.5-5.6-37.8-11.1-60.9-29.8l-10.2-8.3-5.4 7.3c-3 3.9-8 10.1-11.3 13.7-4 4.4-7.6 9.9-11.1 17-2.8 5.8-10.8 22-17.6 36-28.5 58.3-47.1 86.1-71.4 107.1-17.8 15.4-33.8 24.7-50.1 29.1-11.4 3.1-38.5 3.1-52.9 0-31-6.7-55.2-20.6-78.6-45.1-17.8-18.7-27.7-40.2-31.2-68-2.8-22.7-4-56-4-110.6.1-70.4 2.3-111.1 11.6-213 10.2-112.6 10-111.3 15.9-132.9 8-29.2 17-51.6 27.4-68.6 10-16.2 33.5-38 65.4-60.8 6.4-4.5 11.7-8.4 11.8-8.5.2-.1 1.7-6.8 3.4-14.7 6.1-27.9 16.2-53.4 24.5-62.2 11.4-12 24.5-18.4 49.5-24.2z"
        fill="#C4C4C4"
      />
      <circle
        className="button_left"
        cx={935.5}
        cy={283.5}
        r={47.5}
        fill={buttonLeft ? activeColor : inactiveColor}
      />
      <circle
        className="button_up"
        cx={1050.5}
        cy={183.5}
        r={47.5}
        fill={buttonUp ? activeColor : inactiveColor}
      />
      <circle
        className="button_down"
        cx={1050.5}
        cy={383.5}
        r={47.5}
        fill={buttonDown ? activeColor : inactiveColor}
      />
      <circle
        className="button_right"
        cx={1162.5}
        cy={283.5}
        r={47.5}
        fill={buttonRight ? activeColor : inactiveColor}
      />
      <path
        className="direction_up"
        d="M269 165h-77v56c9.333 11.333 30 34 38 34s29.333-22.667 39-34v-56z"
        fill={directionUp ? activeColor : inactiveColor}
      />
      <path
        className="direction_down"
        d="M269 392h-77v-56c9.333-11.333 30-34 38-34s29.333 22.667 39 34v56z"
        fill={directionDown ? activeColor : inactiveColor}
      />
      <path
        className="direction_left"
        d="M119 240v77h56c11.333-9.333 34-30 34-38s-22.667-29.333-34-39h-56z"
        fill={directionLeft ? activeColor : inactiveColor}
      />
      <path
        className="direction_right"
        d="M341 240v77h-56c-11.333-9.333-34-30-34-38s22.667-29.333 34-39h56z"
        fill={directionRight ? activeColor : inactiveColor}
      />
      <circle
        className="analog_left"
        cx={429}
        cy={511}
        r={93}
        fill={analogLeft ? activeColor : inactiveColor}
        style={{
          position: "relative",
          transition: "transform 200ms ease-out",
          transform:
            analogLeftDirection.length > 0
              ? `${createTransform(analogLeftDirection[0])} ${createTransform(
                  analogLeftDirection[1]
                )}`
              : ""
        }}
      />
      <circle
        className="analog_right"
        cx={843}
        cy={511}
        r={93}
        fill={analogRight ? activeColor : inactiveColor}
        style={{
          position: "relative",
          transition: "transform 200ms ease-out",
          transform:
            analogRightDirection.length > 0
              ? `${createTransform(analogRightDirection[0])} ${createTransform(
                  analogRightDirection[1]
                )}`
              : ""
        }}
      />
      <path
        className="select"
        fill={select ? activeColor : inactiveColor}
        d="M471 262h75v47h-75z"
      />
      <path
        className="start"
        d="M728 309v-49l72 23-72 26z"
        fill={start ? activeColor : inactiveColor}
      />
    </svg>
  );
}

export default GamepadSvg;
