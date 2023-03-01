import React from "react"
import Answers from "../Answers"
import { nanoid } from "nanoid"
import "./style.css";

export default function Question() {

  const [allQuestions, setAllQuestions] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0)

  const questions = allQuestions.map(item => {
    return (
      <div className="question" key={item.key}>
        <h1 className="question-title" dangerouslySetInnerHTML={{__html: item.question}}></h1>
        <Answers
          answers={item.answers}
          correctAnswer={item.correctAnswer}
          gameOver={gameOver}
          scoreCount={scoreCount}
        />
      </div>
    )
  })

  function scoreCount() {
    setScore(prev => prev + 1)
    if(!gameOver) setScore(0)
  }

  function randomAnswers(data) {
    const answers = [];
    for (let i = 0; i < 4; i++) {
      let randomAnswer = data[Math.floor(Math.random() * 4)];
      if (!answers.includes(randomAnswer)) answers.push(randomAnswer);
      else i--;
    }
    return answers;
  }

  function toggleGameOver() {
    setGameOver(prev => !prev)
  }

  React.useEffect(() => {
    if (!gameOver) {
      fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple")
      .then(res => res.json())
      .then(data => setAllQuestions(data.results.map(item => {
        return {
          question: item.question,
          key: nanoid(),
          answers: randomAnswers([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer,
        }
      })))
    }
  },[gameOver])

  console.log(allQuestions)

  return (
    <div className="question-container">
      {questions}
      <div className="row">
        {gameOver && <p className="stats">{`You scored ${score}`}</p>}
        <button
          className="quiz-btn"
          onClick={toggleGameOver}>{gameOver ? "Restart" : "Check answers"}
        </button>
      </div>
    </div>
  )
}