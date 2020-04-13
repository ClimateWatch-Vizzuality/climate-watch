import { pixelBreakpoints } from 'components/responsive';

const minColumnWidth = 180;
export const getResponsiveWidth = (columns, width, leftSplittedPosition) => {
  if (columns.length === 1) return width;
  if (leftSplittedPosition) return width;
  const isMinColumSized = width / columns < minColumnWidth;

  let responsiveRatio = 1.4; // Mobile
  let responsiveColumnRatio = 0.2;

  if (width > pixelBreakpoints.portrait && width < pixelBreakpoints.landscape) {
    responsiveColumnRatio = 0.1;
    responsiveRatio = 1.2; // Tablet
  } else if (width > pixelBreakpoints.landscape) {
    // Desktop
    responsiveColumnRatio = 0.07;
    responsiveRatio = 1;
  }

  const columnRatio = isMinColumSized ? responsiveColumnRatio : 0;
  const columnExtraWidth = columnRatio * columns;
  const calculatedFullWidth = width * responsiveRatio * (1 + columnExtraWidth);
  const minFullWidth = columns * minColumnWidth;
  return calculatedFullWidth > minFullWidth
    ? calculatedFullWidth
    : minFullWidth;
};

export const getTableWidth = (position, width) => {
  if (position === 'full') return width;
  const tableWidths = {
    left: {
      desktop: 0.25,
      landscape: 0.35,
      portrait: 0.4,
      mobile: 0.5
    },
    right: {
      desktop: 0.75,
      landscape: 0.65,
      portrait: 0.6,
      mobile: 0.5
    }
  };
  if (width > pixelBreakpoints.desktop - 100) {
    return tableWidths[position].desktop * width;
  }
  if (width > pixelBreakpoints.landscape) {
    return tableWidths[position].landscape * width;
  }
  if (width > pixelBreakpoints.portrait) {
    return tableWidths[position].portrait * width;
  }
  return tableWidths[position].mobile * width;
};
