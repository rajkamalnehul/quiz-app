import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    totalDuration: 10,
    secondsRemaining: 10,
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
