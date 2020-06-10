export const setColumnWidth = ({
  column,
  columns,
  tableWidth = 1000,
  narrowColumnWidth = 180,
  narrowColumns = [],
  wideColumnWidth = 300,
  wideColumns = []
}) => {
  const numColumns = columns.length;
  const numNarrowColumns = narrowColumns.length;
  const colPadding = 10;
  const columnWidth =
    (tableWidth -
      (numColumns + 2) * colPadding -
      numNarrowColumns * narrowColumnWidth) /
    (numColumns - numNarrowColumns);
  const index = columns.indexOf(column);
  if (index !== -1 && wideColumns.indexOf(index) > -1) return wideColumnWidth;
  return index !== -1 && narrowColumns.indexOf(index) > -1
    ? narrowColumnWidth
    : columnWidth;
};
