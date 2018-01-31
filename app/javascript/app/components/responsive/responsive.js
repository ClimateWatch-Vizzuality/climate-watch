import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={'75rem'} />;
export const TabletLandscape = props => (
  <Responsive {...props} minWidth={'56.25rem'} />
);
export const TabletPortrait = props => (
  <Responsive {...props} minWidth={'37.5rem'} />
);
export const TabletPortraitOnly = props => (
  <Responsive {...props} maxWidth={'56.25rem'} />
);
export const MobileOnly = props => (
  <Responsive {...props} maxWidth={'37.4375rem'} />
);
