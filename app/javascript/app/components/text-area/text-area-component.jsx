import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizableTextarea from 'react-textarea-autosize';
import { themr } from 'react-css-themr';
import cx from 'classnames';
import styles from './text-area-styles';

class TextArea extends Component {
  render() {
    const {
      value,
      className,
      onDescriptionChange,
      onFocus,
      theme,
      failed,
      style
    } = this.props;
    return (
      <ResizableTextarea
        className={cx(className, theme.textArea, { [theme.textAreaFailed]: failed })}
        minRows={8}
        style={{ fontSize: '1rem', ...style }}
        onChange={e => onDescriptionChange(e.target.value)}
        onFocus={e => onFocus(e.target.value)}
        placeholder="Add a description"
        value={value}
      />
    );
  }
}

TextArea.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  failed: PropTypes.bool,
  onDescriptionChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default themr('TextArea', styles)(TextArea);
