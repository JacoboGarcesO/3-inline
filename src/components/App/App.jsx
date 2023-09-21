import { useState } from 'react';
import './App.css';

const TURNS = {
  X: '❌',
  O: '⚪'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

export const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null -> No hay ganador
  // false -> Empate
  // X u O -> para ganador
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    }
  }

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b]
        && boardToCheck[b] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return null;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  return (
    <main className="board">
      <h1>3 En línea</h1>

      <section className="game">
        {
          board.map((elemento, index) => {
            return <Square key={index} index={index} updateBoard={updateBoard}>
              <span>{board[index]}</span>
            </Square>
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          <span>{TURNS.X}</span>
        </Square>
        <Square isSelected={turn === TURNS.O}>
          <span>{TURNS.O}</span>
        </Square>
      </section>

      {
        winner !== null
          ? <section className='winner'>
            <div className='text'>
              <h2>Ganó - Empate</h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
          : null
      }
    </main>
  )
}

const Square = ({ children, index, updateBoard, isSelected }) => {
  const classes = isSelected ? 'square is-selected' : 'square';

  const handleClick = () => {
    updateBoard(index);
  }

  return <div className={classes} onClick={handleClick}>{children}</div>
}
