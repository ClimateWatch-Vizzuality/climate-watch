import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import cx from 'classnames';
import styles from './explore-group-styles.scss';

class ExploreButtonsGroup extends PureComponent {
  render() {
    const {
      exploreButtonText,
      exploreButtonConfig,
      buttonGroupConfig,
      theme
    } = this.props;
    const isNdcp = exploreButtonConfig && exploreButtonConfig.isNdcp;
    const link = exploreButtonConfig && exploreButtonConfig.link;
    const href = exploreButtonConfig && exploreButtonConfig.href;

    return (
      <div className={cx(styles.container, theme.container)}>
        <ButtonGroup
          key="action1"
          className={styles.btnGroup}
          buttonsConfig={buttonGroupConfig}
        />
        <Button
          key="action2"
          className={styles.exploreBtn}
          variant="primary"
          href={isNdcp ? href : null}
          link={isNdcp ? null : link}
          onClick={exploreButtonConfig.handleAnalyticsClick}
        >
          {exploreButtonText}
        </Button>
      </div>
    );
  }
}

ExploreButtonsGroup.propTypes = {
  exploreButtonText: PropTypes.string.isRequired,
  buttonGroupConfig: PropTypes.array,
  exploreButtonConfig: PropTypes.object,
  theme: PropTypes.object
};

ExploreButtonsGroup.defaultProps = {
  buttonGroupConfig: [],
  exploreButtonConfig: {},
  theme: {}
};

export default ExploreButtonsGroup;
