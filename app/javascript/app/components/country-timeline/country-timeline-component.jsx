import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HorizontalTimeline from 'react-horizontal-timeline';
import TimelineProvider from 'providers/timeline-provider';

import styles from './country-timeline-styles.scss';

class CountryTimeline extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      index: 0,
      previous: 0,
      open: false
    };
  }

  getLabel(year, index) {
    const { documents } = this.props;
    let content = null;
    if (this.state.open && this.state.index === index) {
      content = (
        <div className={styles.tooltip}>
          {documents[year].map(document => (
            <a
              className={styles.documentLink}
              key={document.link}
              target="_blank"
              href={document.link}
            >
              {document.text}
            </a>
          ))}
        </div>
      );
    }
    return (
      <div className={styles.contentLabel}>
        {content}
        <span>{year}</span>
      </div>
    );
  }

  render() {
    const { documentYears } = this.props;
    return (
      <div className={styles.timeline}>
        <TimelineProvider />
        {documentYears ? (
          <HorizontalTimeline
            index={this.state.index}
            indexClick={index => {
              this.setState({ index, previous: this.state.index, open: true });
            }}
            getLabel={(year, index) => this.getLabel(year, index)}
            values={documentYears}
          />
        ) : null}
      </div>
    );
  }
}

CountryTimeline.propTypes = {
  documents: PropTypes.object,
  documentYears: PropTypes.array
};

export default CountryTimeline;
