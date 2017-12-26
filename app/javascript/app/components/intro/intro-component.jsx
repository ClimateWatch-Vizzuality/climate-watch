import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Button from 'components/button';
import cx from 'classnames';

import styles from './intro-styles.scss';

const Intro = props => {
  const { title, description, theme, textColumns, button } = props;
  return (
    <div className={theme.intro}>
      <div className={theme.main}>
        <h2 className={theme.title}>{title}</h2>
        {button && (
          <Button color="yellow" className={theme.button} link={button.link}>
            {button.text}
          </Button>
        )}
      </div>
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
  button: PropTypes.object,
  textColumns: PropTypes.bool
};

export default themr('Intro', styles)(Intro);
