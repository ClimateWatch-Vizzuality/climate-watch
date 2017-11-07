import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ editorState, onChange, modifier, children }) => {
  const onClick = () => onChange(modifier(editorState));
  return (
    <span role="presentation" onClick={onClick}>
      {children}
    </span>
  );
};

Button.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  modifier: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Button;
