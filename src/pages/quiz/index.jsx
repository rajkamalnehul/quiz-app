import React, { useState, useRef, useEffect, useCallback } from "react";
import questionsData from "../../constants/questions.json";
import Button from "../../components/buttons/button";
import Option from "../../components/option/option";
import Timer from "../../components/timer";
// import { timerSelector } from "../../store/selectors/timer";
import "./quiz.scss";

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  //const secondsRemaining = timerSelector().secondsRemaining;
  const currentQuestion = questionsData.questions[currentQuestionIndex];

  const handleAnswerSelection = (selectedAnswer) => {
    console.log("handle answer");
    const currentQuestion = questionsData.questions[currentQuestionIndex];
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedAnswer,
    }));
  };

  // console.log(userAnswers, currentQuestionIndex);

  const handleNextQuestion = () => {
    console.log("handlenext");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const checkUserResponse = () => {
    const currentQuestion = questionsData.questions[currentQuestionIndex];
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

  const checkAnswer = () => {
    console.log(checkUserResponse());
  };

  return (
    <div className="quiz-layout">
      <div className="quiz-card">
        <h1>Quiz</h1>
        <div className="quiz-header">
          <span>1/15</span>
          <span className="score">Score : 10</span>
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
            <input
              type="radio"
              id="true"
              value="true"
              name="answer"
              onChange={() => handleAnswerSelection(true)}
              checked={userAnswers[currentQuestion.id] === true}
            />
            <label htmlFor="true">True</label>
            <input
              type="radio"
              id="false"
              value="false"
              name="answer"
              onChange={() => handleAnswerSelection(false)}
              checked={userAnswers[currentQuestion.id] === false}
            />
            <label htmlFor="false">False</label>
          </div>
        )}
        {currentQuestion.type === "open_ended" && (
          <input
            type="text"
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
            onClick={checkAnswer}
            label={"Submit"}
            className={"primary-button"}
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
