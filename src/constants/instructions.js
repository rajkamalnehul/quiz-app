import { TIMER_DURATION, SCORE_PER_QUESTION } from "./constants";
import questionsData from "./questions.json";
export const instruction = [
  `Total time to complete this quiz is ${TIMER_DURATION / 60} mins.`,
  `Manage your time wisely to answer all question within the allocated time.`,
  `Questions are presented in MCQ, true/false or open ended format.`,
  `Utilise the Save button to save your response.`,
  `The quiz comprises of ${questionsData.questions.length} questions, each worth ${SCORE_PER_QUESTION} points.`,
  `The total score achievable is ${
    questionsData.questions.length * SCORE_PER_QUESTION
  } points.`,
  "Once you Save your response it cannot be changed.",
  "Once you Submit your quiz you cannot change your response but you can review it.",
  "You can Quit the quiz by clicking on Quit button.",
  "If you Quit the quiz. Click on Reset to restart the quiz.",
];
