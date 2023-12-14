import { createSlice } from "@reduxjs/toolkit";

export const quizDataSlice = createSlice({
  name: "quizdata",
  initialState: {
    quizdata: {
      score: 0,
      currentQuestionIndex: 0,
      userAnswers: [],
    },
  },
  reducers: {
    updateQuizData: (state, action) => {},
  },
});

export const { updateQuizData } = quizDataSlice.actions;

export default quizDataSlice.reducer;
