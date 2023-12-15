import { createSlice } from "@reduxjs/toolkit";
import { TIMER_DURATION } from "../../../constants/constants";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    totalDuration: TIMER_DURATION,
    secondsRemaining: TIMER_DURATION,
    startTime: null,
    status: "in_progress",
  },
  reducers: {
    updateSecondsRemaining: (state, action) => {
      state.secondsRemaining = action.payload;
    },
    updateStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    resetQuizTimer: (state) => {
      state.totalDuration = TIMER_DURATION;
      state.secondsRemaining = TIMER_DURATION;
      state.startTime = null;
      state.status = "in_progress";
    },
    submitQuizTimer: (state) => {
      state.totalDuration = TIMER_DURATION;
      state.secondsRemaining = 0;
      state.startTime = null;
      state.status = "submit";
    },
    quitQuizTimer: (state) => {
      state.totalDuration = TIMER_DURATION;
      state.secondsRemaining = 0;
      state.startTime = null;
      state.status = "quit";
    },
  },
});

export const {
  updateSecondsRemaining,
  updateStartTime,
  resetQuizTimer,
  quitQuizTimer,
  submitQuizTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
