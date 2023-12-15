import React, { useEffect, useState, useRef } from "react";
import { timerSelector } from "../../store/selectors/timer";
import {
  updateSecondsRemaining,
  submitQuizTimer,
} from "../../store/slices/timer";
import { updateStartTime } from "../../store/slices/timer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Timer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [now, setNow] = useState(null);
  const timerRef = useRef(null);
  const secondsRemaining = timerSelector().secondsRemaining;
  const totalDuration = timerSelector().totalDuration;
  const startTime = timerSelector().startTime;
  const quizStatus = timerSelector().status;

  useEffect(() => {
    //To reset start time if user refresh page and quiz is in progress state
    if (quizStatus == "in_progress") {
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
    }

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

  useEffect(() => {
    if (secondsRemaining === 0 && quizStatus == "in_progress") {
      dispatch(submitQuizTimer());
      alert("Times Up!");
      navigate("/result");
    } else if (secondsRemaining === 0 && quizStatus == "quit") {
      alert("This quiz is closed. Please reset quiz");
      navigate("/result");
    } else if (secondsRemaining === 0 && quizStatus == "submit") {
      clearInterval(timerRef.current);
    }
  }, [secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  const percentageRemaining = (secondsRemaining / totalDuration) * 100;

  let color = "#00a63d"; // Default color
  if (percentageRemaining <= 50 && percentageRemaining > 20) {
    color = "orange"; //  time remaining is 20% or less
  } else if (percentageRemaining <= 20) {
    color = "red"; // time remaining is 10% or less
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
