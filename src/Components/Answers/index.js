import React from "react";
import "./style.css";
import { nanoid } from "nanoid";

function Answers(props) {
  const [answers, setAnswers] = React.useState(generateAnswers())

  const allAnswers = answers.map(item => {
    return (
      <li key={item.key}>
        <button 
        dangerouslySetInnerHTML={{__html: item.value}}
        onClick={() => toggleSelect(item.id)}
        className={generateClass(item)}>
      </button>
      </li>
    )
  })

  React.useEffect(() => {
    answers.map(item => {
      if (item.isCorrect) props.scoreCount()
    })
  },[props.gameOver])

  function toggleSelect(id) {
    setAnswers(prev => prev.map(item => {
      if (item.id === id) {
        if (item.value === props.correctAnswer) {
          return {...item, isSelected: !item.isSelected, isCorrect: true}
        }
        else return {...item, isSelected: !item.isSelected}
      }
      else return {...item, isSelected: false}
    }))
  }

  function generateClass(item) {
    if (props.gameOver) {
      if (item.value === props.correctAnswer) {
        return "btn correct"
      }
      else if (item.isSelected && !item.isCorrect) {
        return "btn incorrect disable"
      }
      else return "btn disable"
    }
    else if (item.isSelected) return "btn selected"

    else return "btn"
  }

  function generateAnswers() {
    const answers = props.answers.map((item, i) => {
      return {
        value: item,
        isSelected: false,
        isCorrect: false,
        key: nanoid(),
        id: nanoid()
      }
    })
    return answers
  }
  
  return (
    <ul className="answers-container">{allAnswers}</ul>
  )
}
export default Answers  