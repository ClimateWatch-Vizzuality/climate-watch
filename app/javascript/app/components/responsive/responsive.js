import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={780} />;
export const Tablet = props => (
  <Responsive {...props} minWidth={360} maxWidth={779} />
);
export const Mobile = props => <Responsive {...props} maxWidth={359} />;
