import React, { useState, useEffect } from "react";
import { resetQuizTimer } from "../../store/slices/timer";
import { resetQuiz } from "../../store/slices/quizData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/button";
import { quizDataSelector } from "../../store/selectors/quizData";
import { statusSelector } from "../../store/selectors/timer";
import questionsData from "../../constants/questions.json";
import "./result.scss";

function Result() {
  const [attempted, setAttempted] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submittedAnswers = quizDataSelector().submittedAnswers;
  const score = quizDataSelector().score;
  const quizStatus = statusSelector();

  useEffect(() => {
    const answers = { ...submittedAnswers };
    let correctAnswer = 0;
    let questionAttempted = 0;

    for (let key in answers) {
      questionAttempted = questionAttempted + 1;
      if (answers[key].isCorrect) {
        correctAnswer = correctAnswer + 1;
      }
    }
    setAttempted(questionAttempted);
    setCorrectAnswer(correctAnswer);
    setTotalQuestion(questionsData?.questions?.length);
  }, []);

  const reset = () => {
    dispatch(resetQuiz());
    dispatch(resetQuizTimer());
    navigate("/quiz");
  };

  return (
    <div className="result-layout">
      <div className="result-card">
        <h1>Results</h1>
        <div className="result">
          {quizStatus == "submit" && (
            <>
              <p> Total Score : {score || 0}</p>
              <p>
                Attempted: {attempted || 0} / {totalQuestion || 0}
              </p>
              <p>
                Correct: {correctAnswer || 0} / {totalQuestion || 0}
              </p>
            </>
          )}
          {quizStatus == "quit" && (
            <>
              <p> This quiz is closed.</p>
            </>
          )}
          {quizStatus == "in_progress" && (
            <>
              <p> Quiz is in progress</p>
            </>
          )}
        </div>
        <div className="btn-container">
          <div className="btn-container-inner">
            {quizStatus == "submit" ? (
              <>
                <Button
                  onClick={reset}
                  label={"Reset"}
                  className={"outlined-button"}
                />
                <Button
                  onClick={() => navigate("/quiz")}
                  label={"Review"}
                  className={"outlined-button"}
                />
              </>
            ) : quizStatus == "quit" ? (
              <Button
                onClick={reset}
                label={"Reset"}
                className={"outlined-button"}
              />
            ) : (
              <Button
                onClick={() => navigate("/quiz")}
                label={"Go to quiz"}
                className={"outlined-button"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
