import { useState } from 'react';
import './App.css';

const TURNS = {
  X: '❌',
  O: '⚪'
}

export const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
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
