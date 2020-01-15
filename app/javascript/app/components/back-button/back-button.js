import { createElement } from 'react';
import { previousPathLabel } from 'app/utils/history';
import { withRouter } from 'react-router';
import Component from './back-button-component';

const Container = props => {
  const { clearRegexs, directLinksRegexs, history, lastPathLabel } = props;
  const updatedLastPathLabel =
    lastPathLabel ||
    previousPathLabel(clearRegexs || [], directLinksRegexs || []);
  return createElement(Component, {
    ...props,
    goBack: history.goBack,
    lastPathLabel: updatedLastPathLabel
  });
};

export default withRouter(Container);
