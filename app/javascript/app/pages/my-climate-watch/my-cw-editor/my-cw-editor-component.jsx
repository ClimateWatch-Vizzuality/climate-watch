import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import LoginProvider from 'providers/login-provider';
import Button from 'components/button';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'components/my-climate-watch/editor';
import Loading from 'components/loading';

import layout from 'styles/layout.scss';
import styles from './my-cw-editor-styles';

class MyCw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = editorState => this.setState({ editorState });
  }
  render() {
    const { route, login, saveInsight } = this.props;
    const button = {
      text: 'Save',
      onClick: () => {
        const content = convertToRaw(
          this.state.editorState.getCurrentContent()
        );
        saveInsight(content);
      }
    };
    let content = <Loading />;
    if (login.loaded) {
      content = login.logged ? (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      ) : (
        <div className={styles.loginContainer}>
          <Button
            className={styles.login}
            color="yellow"
            href="https://staging-api.globalforestwatch.org/auth/login?callbackUrl=http://localhost:3000/api/v1/auth/login?token=true"
          >
            Login
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Header theme={styles}>
          <div className={layout.content}>
            <Intro theme={styles} title="Write your story" button={button} />
            <AnchorNav useRoutes links={route.routes} theme={styles} />
          </div>
        </Header>
        <LoginProvider />
        <div className={styles.wrapper}>
          <div className={layout.content}>{content}</div>
        </div>
      </div>
    );
  }
}

MyCw.propTypes = {
  login: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  saveInsight: PropTypes.func.isRequired
};

export default MyCw;
