import React, { useState, useRef, useEffect, useCallback } from "react";
import questionsData from "../../constants/questions.json";
import Button from "../../components/buttons/button";
import Option from "../../components/option/option";
import Input from "../../components/input/input";
import Timer from "../../components/timer";
import { quizDataSelector } from "../../store/selectors/quizData";
import {
  updateQuizData,
  updateQuestionIndex,
} from "../../store/slices/quizData";
import { useDispatch } from "react-redux";
import "./quiz.scss";

function Quiz() {
  const dispatch = useDispatch();
  const [userAnswers, setUserAnswers] = useState({});
  const currentQuestionIndex = quizDataSelector().currentQuestionIndex;
  const submittedAnswers = quizDataSelector().submittedAnswers;
  const score = quizDataSelector().score;
  const currentQuestion = questionsData.questions[currentQuestionIndex];

  console.log(quizDataSelector());
  const handleAnswerSelection = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedAnswer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsData.questions.length - 1)
      dispatch(updateQuestionIndex(currentQuestionIndex + 1));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0)
      dispatch(updateQuestionIndex(currentQuestionIndex - 1));
  };

  const checkUserResponse = () => {
    const userResponse = userAnswers[currentQuestion.id];
    if (
      currentQuestion.type === "multiple_choice" ||
      currentQuestion.type === "true_false"
    ) {
      return userResponse === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "open_ended") {
      return (
        userResponse.toLowerCase() ===
        currentQuestion.correctAnswer.toLowerCase()
      );
    }
  };

  const isOptionSelected = (id) => {
    const answeredIds = Object.keys(userAnswers);
    if (answeredIds.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const isAnswerSubmitted = (id) => {
    const submitedIds = Object.keys(submittedAnswers);
    if (submitedIds.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const checkAnswer = () => {
    const reduxAnswers = { ...submittedAnswers };
    const userResponse = userAnswers[currentQuestion.id];
    if (isOptionSelected(currentQuestion.id)) {
      if (isAnswerSubmitted(currentQuestion.id)) {
        alert("Cannot change once submited");
      } else {
        dispatch(
          updateQuizData({
            ...reduxAnswers,
            [currentQuestion.id]: {
              answer: userResponse,
              isCorrect: checkUserResponse(),
            },
          })
        );
      }
    } else {
      alert("Please answer to submit");
    }
  };

  return (
    <div className="quiz-layout">
      <div className="quiz-card">
        <h1>Quiz</h1>
        <div className="quiz-header">
          <span>{`${currentQuestionIndex + 1} / ${
            questionsData.questions.length
          }`}</span>
          <span className="score">Score : {score || 0}</span>
          <Timer />
        </div>
        <p className="quiz-question">{currentQuestion.question}</p>
        {currentQuestion.type === "multiple_choice" && (
          <div>
            {currentQuestion.options.map((option, index) => (
              <React.Fragment key={index}>
                <Option
                  text={option}
                  onClick={() => handleAnswerSelection(option)}
                  type={
                    userAnswers[currentQuestion.id] === option
                      ? "selected"
                      : "default"
                  }
                />
              </React.Fragment>
            ))}
          </div>
        )}
        {currentQuestion.type === "true_false" && (
          <div>
            <Option
              text={"TRUE"}
              onClick={() => handleAnswerSelection(true)}
              type={
                userAnswers[currentQuestion.id] === true
                  ? "selected"
                  : "default"
              }
            />
            <Option
              text={"FALSE"}
              onClick={() => handleAnswerSelection(false)}
              type={
                userAnswers[currentQuestion.id] === false
                  ? "selected"
                  : "default"
              }
            />
          </div>
        )}
        {currentQuestion.type === "open_ended" && (
          <Input
            type="text"
            inputType={"default"}
            value={userAnswers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerSelection(e.target.value)}
          />
        )}
        <div className="btn-container">
          <div className="btn-container-inner">
            <Button
              onClick={handlePreviousQuestion}
              label={"Previous"}
              disabled={currentQuestionIndex === 0}
              className={"outlined-button"}
            />

            <Button
              onClick={handleNextQuestion}
              label={"Next"}
              disabled={
                currentQuestionIndex === questionsData.questions.length - 1
              }
              className={"outlined-button"}
            />
          </div>

          <Button
            onClick={() => checkAnswer()}
            label={"Submit"}
            className={"primary-button"}
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
