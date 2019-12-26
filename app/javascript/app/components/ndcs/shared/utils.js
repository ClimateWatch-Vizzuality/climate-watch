export const sortByIndexAndNotInfo = (a, b) => {
  const isNotInfo = i => i.index <= 0;
  if (isNotInfo(a)) return 1;
  if (isNotInfo(b)) return -1;
  return a.index - b.index;
};
