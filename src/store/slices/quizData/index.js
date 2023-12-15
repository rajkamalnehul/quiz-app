import { createSlice } from "@reduxjs/toolkit";

export const quizDataSlice = createSlice({
  name: "quizdata",
  initialState: {
    score: 0,
    submittedAnswers: {},
    currentQuestionIndex: 0,
  },
  reducers: {
    updateQuizData: (state, action) => {
      state.submittedAnswers = action.payload;
      let newScore = 0;
      for (let key in action.payload) {
        action.payload[key].isCorrect ? (newScore = newScore + 10) : newScore;
      }
      state.score = newScore;
    },
    updateQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetQuiz: (state) => {
      state.score = 0;
      state.submittedAnswers = {};
      state.currentQuestionIndex = 0;
    },
  },
});

export const { updateQuizData, updateQuestionIndex, resetQuiz } =
  quizDataSlice.actions;

export default quizDataSlice.reducer;
