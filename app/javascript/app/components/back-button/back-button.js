import { createElement } from 'react';
import { previousPathLabel } from 'app/utils/history';
import { withRouter } from 'react-router';
import Component from './back-button-component';

const Container = props => {
  const { clearRegexs, directLinksRegexs, history } = props;
  const lastPathLabel = previousPathLabel(
    clearRegexs || [],
    directLinksRegexs || []
  );
  return createElement(Component, {
    ...props,
    goBack: history.goBack,
    lastPathLabel
  });
};

export default withRouter(Container);
