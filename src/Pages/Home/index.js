import "./style.css"

function Home(props) {
  return(
    <div className="home-container">
      <h1 className="home-title">Quizzical</h1>
      <button className="start-btn" onClick={props.gameStart}>Start quiz</button>
    </div>
  )
}

export default Home