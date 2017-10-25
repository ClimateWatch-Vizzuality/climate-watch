import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HorizontalTimeline from 'react-horizontal-timeline';
import TimelineProvider from 'providers/timeline-provider';

import styles from './country-timeline-styles.scss';

class CountryTimeline extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = { value: 0, previous: 0 };

  render() {
    const { dates } = this.props;
    return (
      <div className={styles.timeline}>
        <TimelineProvider />
        {dates ? (
          <HorizontalTimeline
            index={this.state.value}
            indexClick={index => {
              this.setState({ value: index, previous: this.state.value });
            }}
            getLabel={date => date.split('-')[0]}
            values={dates}
          />
        ) : null}
      </div>
    );
  }
}

CountryTimeline.propTypes = {
  dates: PropTypes.array
};

export default CountryTimeline;
