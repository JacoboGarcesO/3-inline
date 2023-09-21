import { useState } from 'react';
import './App.css';
import { checkWinner, checkEndGame } from '../../logic/board';
import { TURNS } from '../../constants';
import { Square } from '../Square/Square';
import { WinnerModal } from '../WinnerModal/WinnerModal';
import { saveGameToStorage, removeStorage } from '../../logic/storage';

export const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);

    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn');
    return turnStorage || TURNS.X
  });

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

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    removeStorage();
  }

  return (
    <main className="board">
      <h1>3 En línea</h1>
      <button onClick={resetGame}>Reiniciar Juego</button>
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

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}