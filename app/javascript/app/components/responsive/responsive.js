import React from 'react';
import Responsive from 'react-responsive';

export const baseUnit = 16;
export const pixelBreakpoints = {
  mobile: 599,
  portrait: 600,
  landscape: 900,
  desktop: 1200
};
export const getRems = (size, base = baseUnit) => `${size / base}rem`;
export const remBreakpoints = {
  mobile: getRems(pixelBreakpoints.mobile),
  portrait: getRems(pixelBreakpoints.portrait),
  landscape: getRems(pixelBreakpoints.landscape),
  desktop: getRems(pixelBreakpoints.desktop)
};

export const Desktop = props => (
  <Responsive {...props} minWidth={remBreakpoints.desktop} />
);
export const TabletLandscape = props => (
  <Responsive {...props} minWidth={remBreakpoints.landscape} />
);
export const TabletPortrait = props => (
  <Responsive {...props} minWidth={remBreakpoints.portrait} />
);
export const TabletPortraitOnly = props => (
  <Responsive {...props} maxWidth={remBreakpoints.landscape} />
);
export const MobileOnly = props => (
  <Responsive {...props} maxWidth={remBreakpoints.mobile} />
);
