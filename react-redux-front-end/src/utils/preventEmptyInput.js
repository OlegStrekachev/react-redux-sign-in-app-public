export const validateInputAndFocus = (inputRef) => {
  if (inputRef.current.value === "") {
    inputRef.current.focus();
    return true;
  }
  return false;
}
  

