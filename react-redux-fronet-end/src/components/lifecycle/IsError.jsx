export const IsError = ({ error }) => {
  console.log("Error details:", error);
  // Attempting to find a message in a common nested structure or fallback to 'Unknown error'

  return (
    <div>
      <h1>Error: {error}</h1>
    </div>
  );
};
