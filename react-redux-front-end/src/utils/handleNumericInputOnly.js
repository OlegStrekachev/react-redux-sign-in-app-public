export const handleNumberInput = (e) => {
  // Allow numbers, backspace, delete, arrow keys
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

  if (!allowedKeys.includes(e.key)) {
    e.preventDefault(); // Prevent character from being input
  }
};
