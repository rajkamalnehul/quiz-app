import { createSlice } from "@reduxjs/toolkit";
import { TIMER_DURATION } from "../../../constants/constants";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    totalDuration: TIMER_DURATION,
    secondsRemaining: TIMER_DURATION,
    startTime: null,
  },
  reducers: {
    updateSecondsRemaining: (state, action) => {
      state.secondsRemaining = action.payload;
    },
    updateStartTime: (state, action) => {
      state.startTime = action.payload;
    },
  },
});

export const { updateSecondsRemaining, updateStartTime } = timerSlice.actions;

export default timerSlice.reducer;
