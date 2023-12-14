import { useSelector } from "react-redux";

export const quizDataSelector = () => useSelector((state) => state.quizData);
