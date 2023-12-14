import React, { useEffect, useState, useRef } from "react";
import { timerSelector } from "../../store/selectors/timer";
import { updateSecondsRemaining } from "../../store/slices/timer";
import { updateStartTime } from "../../store/slices/timer";
import { useDispatch } from "react-redux";

function Timer() {
  const dispatch = useDispatch();
  const [now, setNow] = useState(null);
  const timerRef = useRef(null);
  const secondsRemaining = timerSelector().secondsRemaining;
  const totalDuration = timerSelector().totalDuration;
  const startTime = timerSelector().startTime;
  console.log(secondsRemaining);

  useEffect(() => {
    //Code to not reset start time if user refresh page
    if (startTime) {
      dispatch(updateStartTime(startTime));
    } else {
      dispatch(updateStartTime(Date.now()));
    }
    setNow(Date.now());

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (startTime !== null && now !== null) {
      const elapsedSeconds = (now - startTime) / 1000;
      let remainingSeconds = Math.max(totalDuration - elapsedSeconds, 0);
      dispatch(updateSecondsRemaining(remainingSeconds));
      if (remainingSeconds == 0) {
        clearInterval(timerRef.current);
      }
    }
  }, [now]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  const percentageRemaining = (secondsRemaining / totalDuration) * 100;

  let color = "white"; // Default color
  if (percentageRemaining <= 50 && percentageRemaining > 20) {
    color = "orange"; // Set color to orange if time remaining is 20% or less
  } else if (percentageRemaining <= 20) {
    color = "red"; // Set color to red if time remaining is 10% or less
  }

  const displayMinutes = String(minutes).padStart(2, "0");
  const displaySeconds = String(seconds).padStart(2, "0");

  return (
    <span style={{ color: color }}>
      {displayMinutes} : {displaySeconds}
    </span>
  );
}

export default Timer;
