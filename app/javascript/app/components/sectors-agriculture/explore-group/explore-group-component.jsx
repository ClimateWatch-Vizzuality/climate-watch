import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'components/button-group';
import Button from 'components/button';

import * as styles from './explore-group-styles.scss';

class ExploreButtonsGroup extends PureComponent {
  render() {
    const {
      // eslint-disable-next-line react/prop-types
      iso,
      // eslint-disable-next-line react/prop-types
      handleInfoClick,
      // eslint-disable-next-line react/prop-types
      handleAnalyticsClick,
      // eslint-disable-next-line react/prop-types
      isEmbed,
      // eslint-disable-next-line react/prop-types
      isNdcp,
      exploreButtonText
    } = this.props;

    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        {
          type: 'info',
          onClick: handleInfoClick
        },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ghg-emissions`,
          analyticsGraphName: 'Country/Ghg-emissions',
          positionRight: true
        },
        {
          type: 'download',
          section: 'ghg-emissions'
        },
        {
          type: 'addToUser'
        }
      ];

    const link = `/ghg-emissions?breakBy=location&filter=${iso}`;
    const href = `/contained/ghg-emissions?breakBy=location&filter=${iso}&isNdcp=true`;

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
          onClick={handleAnalyticsClick}
        >
          {exploreButtonText}
        </Button>
      </div>
    );
  }
}

ExploreButtonsGroup.propTypes = {
  exploreButtonText: PropTypes.string.isRequired
};

export default ExploreButtonsGroup;
