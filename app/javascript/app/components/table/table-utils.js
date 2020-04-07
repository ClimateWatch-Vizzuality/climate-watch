import { pixelBreakpoints } from 'components/responsive';

const minColumnWidth = 180;
export const getResponsiveWidth = (columns, width) => {
  if (columns.length === 1) return width;
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
  return width * responsiveRatio * (1 + columnExtraWidth);
};

export const getTableWidth = (position, width) => {
  if (position === 'full') return width;
  const tableWidths = {
    left: {
      desktop: 0.1,
      landscape: 0.15,
      portrait: 0.2,
      mobile: 0.25
    },
    right: {
      desktop: 0.9,
      landscape: 0.85,
      portrait: 0.8,
      mobile: 0.75
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
