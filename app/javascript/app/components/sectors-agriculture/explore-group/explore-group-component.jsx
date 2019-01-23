import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';
import * as styles from './explore-group-styles.scss';

class ExploreButtonsGroup extends PureComponent {
  render() {
    const {
      exploreButtonText,
      exploreButtonConfig,
      buttonGroupConfig
    } = this.props;
    const isNdcp = exploreButtonConfig && exploreButtonConfig.isNdcp;
    const link = exploreButtonConfig && exploreButtonConfig.link;
    const href = exploreButtonConfig && exploreButtonConfig.href;

    return (
      <div className={styles.container}>
        <ButtonGroup
          key="action1"
          className={styles.btnGroup}
          buttonsConfig={buttonGroupConfig}
        />
        <Button
          key="action2"
          noSpace
          className={styles.exploreBtn}
          color="yellow"
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
  exploreButtonConfig: PropTypes.object
};

ExploreButtonsGroup.defaultProps = {
  buttonGroupConfig: [],
  exploreButtonConfig: {}
};

export default ExploreButtonsGroup;
