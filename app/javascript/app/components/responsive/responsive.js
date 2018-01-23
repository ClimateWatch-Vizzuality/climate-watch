import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={'55em'} />;
export const Tablet = props => (
  <Responsive {...props} minWidth={'30em'} maxWidth={'55em'} />
);
export const Mobile = props => <Responsive {...props} maxWidth={'30em'} />;
