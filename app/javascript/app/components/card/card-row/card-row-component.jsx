import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './card-row-styles.scss';

class CardRow extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { title, subtitle, description, theme, keyValue } = this.props;
    const titleKey = `${keyValue}-title`;
    const subtitleKey = `${keyValue}-subtitle`;
    const descKey = `${keyValue}-desc`;

    return (
      <div key={keyValue} className={cx(styles.cardRow, theme.cardRow)}>
        {title && (
          <p key={titleKey} className={styles.title}>
            {title}
          </p>
        )}
        {subtitle && (
          <p key={subtitleKey} className={styles.subtitle}>
            {subtitle}
          </p>
        )}
        {description && (
          <p
            key={descKey}
            className={cx(styles.description, theme.description, {
              [styles.descriptionExtraPadding]: subtitle
            })}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
}

CardRow.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  keyValue: PropTypes.string,
  theme: PropTypes.shape({
    cardRow: PropTypes.string
  })
};

CardRow.defaultProps = {
  theme: {},
  keyValue: ''
};

export default CardRow;
