import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './intro-styles.scss';

const Intro = props => {
  const { title, description, theme, textColumns } = props;
  return (
    <div className={theme.intro}>
      <h2 className={theme.title}>{title}</h2>
      <p
        className={cx(theme.description, textColumns ? theme.columns : '')}
        dangerouslySetInnerHTML={{ __html: description }} // eslint-disable-line
      />
    </div>
  );
};

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  theme: PropTypes.object,
  textColumns: PropTypes.bool
};

export default themr('Intro', styles)(Intro);
