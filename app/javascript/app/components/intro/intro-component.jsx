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
    subtitle,
    description,
    disclaimer,
    theme,
    textColumns,
    button,
    customButton,
    className
  } = props;
  const actionButton =
    (customButton || button) &&
    (customButton || (
      <Button color="yellow" className={theme.button} {...button}>
        {button.text}
      </Button>
    ));

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(theme.main, { [styles.withButton]: !!actionButton })}>
        <h2 className={theme.title}>
          {title}
          {subtitle && <span className={theme.subtitle}>{subtitle}</span>}
        </h2>
        <TabletLandscape> {actionButton} </TabletLandscape>
      </div>
      {description && (
        <p
          className={cx(theme.description, textColumns ? theme.columns : '')}
          dangerouslySetInnerHTML={{ __html: description }} // eslint-disable-line
        />
      )}
      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
      <TabletPortraitOnly> {actionButton} </TabletPortraitOnly>
    </div>
  );
};

Intro.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.string,
  description: PropTypes.string,
  disclaimer: PropTypes.string,
  theme: PropTypes.object,
  button: PropTypes.object,
  customButton: PropTypes.object,
  textColumns: PropTypes.bool,
  className: PropTypes.string
};

Intro.defaultProps = {
  disclaimer: ''
};

export default themr('Intro', styles)(Intro);
