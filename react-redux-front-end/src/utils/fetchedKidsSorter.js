export const fetchedKidsSorter = (data) => {
  // This function groups kids based on the given age range
  // Sort kids by age and store in separate variables
  const kids0to2 = data
    .filter((kid) => kid.age >= 0 && kid.age < 2)
    .sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
    .map((el) => ({ ...el, color: "green" }));
  const kids2to4 = data
    .filter((kid) => kid.age >= 2 && kid.age < 3)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((el) => ({ ...el, color: "blue" }));
  const kids4Plus = data
    .filter((kid) => kid.age >= 3)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((el) => ({ ...el, color: "red" }));

  const mergedGroups = [...kids0to2, ...kids2to4, ...kids4Plus];

  return mergedGroups;
};
