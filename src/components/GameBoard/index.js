import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {ResultContainer, ResultCard} from '../styledComponents'

const apiConstants = {
  initial: null,
  rock: 'ROCK',
  paper: 'PAPER',
  scissors: 'SCISSORS'
}

class GameBoard extends Component {
  state = {
    score: 0,
    choice = apiConstants.initial,
    gameResult: false,
  }

  getResult = (opponentImg, yourImg) => {
    if (yourImg.id === 'ROCK') {
      switch (opponentImg.id) {
        case 'PAPER':
          return 'YOU LOOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (yourImg.id === 'PAPER') {
      switch (opponentImg.id) {
        case 'SCISSORS':
          return 'YOU LOOSE'
        case 'ROCK':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (yourImg.id === 'SCISSORS') {
      switch (opponentImg.id) {
        case 'PAPER':
          return 'YOU WON'
        case 'ROCK':
          return 'YOU LOOSE'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  onClickAgain = () => this.setState({gameResult: false})

  renderResult = () => {
    const {choice} = this.state
    const {choicesList} = this.props
    const shuffledImgs = choicesList.sort(() => Math.random() - 0.5)
    const opponentImg = shuffledImgs[0]
    const yourImg = shuffledImgs.filter(each => each.id === choice)
    const result = this.getResult(opponentImg, yourImg)
    let newScore = 0
    if (result === 'YOU WON') {
      newScore = score + 1
    } else if (result === 'YOU LOOSE') {
      newScore = score - 1
    } else if (result === 'IT IS DRAW') {
      newScore = newScore
    }
    this.setState({score: newScore})

    return (
      <>
        <ResultContainer>
          <ResultCard>
            <p>YOU</p>
            <button>
              <img src={yourImg.imageUrl} alt="your choice" />
            </button>
          </ResultCard>
          <ResultCard>
            <p>OPPONENT</p>
            <button>
              <img src={opponentImg.imageUrl} alt="opponent choice" />
            </button>
          </ResultCard>
        </ResultContainer>
        <ResultCard>
          <p>{result}</p>
          <button type="button" onClick={this.onClickAgain}>
            PLAY AGAIN
          </button>
        </ResultCard>
      </>
    )
  }

  onClickRock = () => this.setState({choice: apiConstants.rock, gameResult: true})

  onClickPaper = () => this.setState({choice: apiConstants.paper, gameResult: true})

  onClickScissor = () => this.setState({choice: apiConstants.scissors, gameResult: true})

  renderGame = () => {
    const {choicesList} = this.props
    return (
      <div>
        <button data-testid="rockButton" onClick={this.onClickRock}>
          <img src={choicesList[0].imageUrl} alt={choicesList[0].id} />
        </button>
        <button data-testid="scissorButton" onClick={this.onClickScissor}>
          <img src={choicesList[1].imageUrl} alt={choicesList[1].id} />
        </button>
        <button data-testid="paperButton" onClick={this.onClickPaper}>
          <img src={choicesList[2].imageUrl} alt={choicesList[2].id} />
        </button>
      </div>
    )
  }

  render() {
    const {score, gameResult} = this.state
    return (
      <div>
        <div>
          <div>
            <h1>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </h1>
          </div>
          <div>
            <p>Score</p>
            <p>{score}</p>
          </div>
        </div>
        <div>{gameResult ? this.renderResult() : this.renderGame()}</div>
        <Popup trigger={<button type="button">Rules</button>}>
          {close => (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
              <RiCloseLine onClick={() => close()} />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default GameBoard
