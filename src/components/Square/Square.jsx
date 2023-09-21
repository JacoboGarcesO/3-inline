export const Square = ({ children, index, updateBoard, isSelected }) => {
  const classes = isSelected ? 'square is-selected' : 'square';

  const handleClick = () => {
    updateBoard(index);
  }

  return <div className={classes} onClick={handleClick}>{children}</div>
}
