import React from 'react';
import Responsive from 'react-responsive';

export const DesktopUp = props => <Responsive {...props} minWidth={'75rem'} />;
export const TabletLandscapeUp = props => (
  <Responsive {...props} minWidth={'56.25rem'} />
);
export const TabletPortraitUp = props => (
  <Responsive {...props} minWidth={'37.5rem'} />
);
export const MobileOnly = props => (
  <Responsive {...props} maxWidth={'37.4375rem'} />
);
