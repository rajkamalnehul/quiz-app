import React, { useState } from "react";
import questionsData from "../../constants/questions.json";
import Button from "../../components/buttons/button";
import Option from "../../components/option/option";
import Input from "../../components/input/input";
import Timer from "../../components/timer";
import { statusSelector } from "../../store/selectors/timer";
import { quizDataSelector } from "../../store/selectors/quizData";
import { quitQuizTimer, submitQuizTimer } from "../../store/slices/timer";
import {
  updateQuizData,
  updateQuestionIndex,
} from "../../store/slices/quizData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./quiz.scss";

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState({});
  const currentQuestionIndex = quizDataSelector().currentQuestionIndex;
  const submittedAnswers = quizDataSelector().submittedAnswers;
  const score = quizDataSelector().score;
  const quizStatus = statusSelector();
  const currentQuestion = questionsData.questions[currentQuestionIndex];

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

  function getOptionType(option, currentQuestion, submittedAnswers) {
    const isSubmitted = isAnswerSubmitted(currentQuestion.id);
    const isCorrect = submittedAnswers[currentQuestion.id]?.isCorrect || false;
    const isCorrectOption = currentQuestion?.correctAnswer === option || false;
    const isSelected = userAnswers[currentQuestion.id] === option || false;

    if (isSubmitted) {
      if (isCorrect && isCorrectOption) {
        return "correct";
      } else if (isCorrect && !isCorrectOption) {
        return "default";
      } else {
        return isCorrectOption ? "correct" : "wrong";
      }
    } else {
      return isSelected ? "selected" : "default";
    }
  }

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
                  label={
                    index == 0
                      ? "A. "
                      : index == 1
                      ? "B. "
                      : index == 2
                      ? "C. "
                      : "D. "
                  }
                  onClick={() => handleAnswerSelection(option)}
                  type={getOptionType(
                    option,
                    currentQuestion,
                    submittedAnswers
                  )}
                />
              </React.Fragment>
            ))}
          </div>
        )}
        {currentQuestion.type === "true_false" && (
          <div>
            <Option
              text={"TRUE"}
              label={"A."}
              onClick={() => handleAnswerSelection(true)}
              type={getOptionType(true, currentQuestion, submittedAnswers)}
            />
            <Option
              text={"FALSE"}
              label={"B. "}
              onClick={() => handleAnswerSelection(false)}
              type={getOptionType(false, currentQuestion, submittedAnswers)}
            />
          </div>
        )}
        {currentQuestion.type === "open_ended" && (
          <Input
            type="text"
            inputType={getOptionType(
              submittedAnswers[currentQuestion.id]?.answer || "",
              currentQuestion,
              submittedAnswers
            )}
            value={
              submittedAnswers[currentQuestion.id]?.answer ||
              userAnswers[currentQuestion.id] ||
              ""
            }
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
            onClick={() => {
              if (quizStatus == "in_progress") {
                checkAnswer();
              } else {
                alert("This quiz is submited. You can only review");
              }
            }}
            label={"Save"}
            className={"primary-button"}
          />
        </div>
        <div className="footer">
          {quizStatus == "in_progress" && (
            <>
              <Button
                onClick={() => {
                  dispatch(submitQuizTimer());
                  navigate("/result");
                }}
                label={"Submit Quiz"}
                className={"sucess-button"}
              />
              <Button
                onClick={() => {
                  if (window.confirm("Do you really want to quit?")) {
                    dispatch(quitQuizTimer());
                    navigate("/result");
                  }
                }}
                label={"Quit"}
                className={"danger-button"}
              />
            </>
          )}
          {quizStatus == "submit" && (
            <>
              <Button
                onClick={() => {
                  navigate("/result");
                }}
                label={"Go to result"}
                className={"sucess-button"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
