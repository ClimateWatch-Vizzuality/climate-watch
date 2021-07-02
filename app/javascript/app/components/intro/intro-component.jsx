import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import Button from 'components/button';
import cx from 'classnames';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import AbbrReplace, { replaceStringAbbr } from 'components/abbr-replace';
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
    className,
    tag
  } = props;
  const actionButton =
    (customButton || button) &&
    (customButton || (
      <Button variant="primary" className={theme.button} {...button}>
        {button.text}
      </Button>
    ));
  const TitleTagComponent = tag;
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(theme.main, { [styles.withButton]: !!actionButton })}>
        <TitleTagComponent className={theme.title}>
          <AbbrReplace>
            <div className={theme.titleText}>{title}</div>
            {subtitle && <span className={theme.subtitle}>{subtitle}</span>}
          </AbbrReplace>
        </TitleTagComponent>
        <TabletLandscape> {actionButton} </TabletLandscape>
      </div>
      {description && (
        <p
          className={cx(theme.description, textColumns ? theme.columns : '')}
          dangerouslySetInnerHTML={{ __html: replaceStringAbbr(description) }} // eslint-disable-line
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
  className: PropTypes.string,
  tag: PropTypes.string
};

Intro.defaultProps = {
  disclaimer: '',
  tag: 'h1'
};

export default themr('Intro', styles)(Intro);
