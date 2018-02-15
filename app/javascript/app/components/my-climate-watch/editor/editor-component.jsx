import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

class MyEditor extends PureComponent {
  render() {
    return (
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        placeholder="Write something below"
      />
    );
  }
}

MyEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MyEditor;
