export const setColumnWidth = (
  column,
  columns,
  tableWidth,
  narrowColumnWidth,
  _narrowColumns
) => {
  const narrowColumns = _narrowColumns || [];
  const numColumns = columns.length;
  const numNarrowColumns = narrowColumns.length;
  const colPadding = 10;
  const columnWidth =
    (tableWidth -
      (numColumns + 2) * colPadding -
      numNarrowColumns * narrowColumnWidth) /
    (numColumns - numNarrowColumns);
  const index = columns.indexOf(column);
  return index !== -1 && narrowColumns.indexOf(index) > -1
    ? narrowColumnWidth
    : columnWidth;
};
