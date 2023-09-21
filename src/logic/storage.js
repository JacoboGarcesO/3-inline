export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
}

export const removeStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
}