import "./styles.css";
import Squares from "./Squares";
import Board from "./Board";
import { useState, useEffect } from "react";
const defaultSquares = () => new Array(9).fill(null);
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function App() {
  const [squares, setSquares] = useState(defaultSquares);
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(null)
  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 === 1;
    const linesThatAre = (a, b, c) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };
    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);
    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;
    if (playerWon) {
      setWinner("x");
      
    }
    if (computerWon) {
      setWinner("o");
      
    }
    const putComputerAt = (index) => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(
          linesToContinue[0].filter((index) => squares[index] === null)[0]
        );
        return;
      }

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
    }
  }, [squares]);
  const handleSquareClick = (index) => {
    if(!winner && ! tie){
      const isPlayerTurn =
      squares.filter((square) => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = "x";
      let Xnumber = newSquares.filter((squares) => {
        return squares === 'x'
      })
      if (Xnumber.length === 4) {
        setTie(true)
      }
      setSquares([...newSquares]);
    }
    }
   
  };
  const restartGame =()=>{
    setSquares(defaultSquares)
    setWinner(null)
    setTie(null)
  }
  return (
    <main>
      <div className="header"> Tic Tac Toe by SR </div>
      <Board>
        {squares.map((element, index) => (
          <Squares
            x={element === "x" ? 1 : 0}
            o={element === "o" ? 1 : 0}
            onClick={() => handleSquareClick(index)}
            
          />
        ))}
      </Board>
      {!!winner && winner === "x" && <div>You Won!</div>}
      {!!winner && winner === "o" && <div>You Lost!</div>}
      {!winner && tie ? <div>Tie !</div> : <div></div>}

      <div className='restart'><button onClick={()=>restartGame()}>Restart Game</button></div>
    </main>
  );
}
