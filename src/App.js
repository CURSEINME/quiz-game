import React from "react"
import Quiz from "./Pages/Quiz";
import Home from "./Pages/Home";
import "./App.css"

function App() {

  const [gameStart, setGameStart] = React.useState(false)

  function gameStartToggle() {
    setGameStart(prev => !prev)
  }

  return (
    <div className="container">
      {gameStart ? <Quiz/> : <Home gameStart={gameStartToggle}/>}
    </div>
  );
}

export default App;
