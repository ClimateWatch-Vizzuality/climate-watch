import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './card-styles.scss';

class Card extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      title,
      subtitle,
      children,
      theme,
      contentFirst,
      keyValue
    } = this.props;
    const keyValueChildren = `children-${keyValue}`;

    const renderChildren = () => (
      <div key={keyValueChildren} className={cx(styles.data, theme.data)}>
        {children}
      </div>
    );

    const handleClick = url => {
      window.open(url, '_blank');
    };

    const renderContent = () => (
      <div
        key={`content-${keyValue}`}
        className={cx(styles.contentContainer, theme.contentContainer)}
      >
        {typeof title === 'object' ? (
          <a
            role="button"
            tabIndex={0}
            onKeyPress={() => handleClick(title.link)}
            onClick={() => handleClick(title.link)}
            className={cx(styles.title, styles.link, theme.title)}
          >
            {title.title}
          </a>
        ) : (
          title && <p className={cx(styles.title, theme.title)}>{title}</p>
        )}
        {subtitle && (
          <p className={cx(styles.subtitle, theme.subtitle)}>{subtitle}</p>
        )}
      </div>
    );

    return (
      <div className={cx(styles.card, theme.card)} key={keyValue}>
        {contentFirst
          ? [renderContent(), renderChildren()]
          : [renderChildren(), renderContent()]}
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subtitle: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.shape({
    card: PropTypes.string,
    contentContainer: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.data
  }),
  contentFirst: PropTypes.bool,
  keyValue: PropTypes.string
};

Card.defaultProps = {
  theme: {},
  contentFirst: false,
  keyValue: ''
};

export default Card;
