import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Button from 'components/button';
import cx from 'classnames';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import styles from './intro-styles.scss';

const Intro = props => {
  const {
    title,
    description,
    disclaimer,
    theme,
    textColumns,
    button,
    className
  } = props;
  const actionButton = button && (
    <Button color="yellow" className={theme.button} link={button.link}>
      {button.text}
    </Button>
  );

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={theme.main}>
        <h2 className={theme.title}>{title}</h2>
        <TabletLandscape> {actionButton} </TabletLandscape>
      </div>
      <p
        className={cx(theme.description, textColumns ? theme.columns : '')}
        dangerouslySetInnerHTML={{ __html: description }} // eslint-disable-line
      />
      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
      <TabletPortraitOnly> {actionButton} </TabletPortraitOnly>
    </div>
  );
};

Intro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  disclaimer: PropTypes.string,
  theme: PropTypes.object,
  button: PropTypes.object,
  textColumns: PropTypes.bool,
  className: PropTypes.string
};

Intro.defaultProps = {
  disclaimer: ''
};

export default themr('Intro', styles)(Intro);
