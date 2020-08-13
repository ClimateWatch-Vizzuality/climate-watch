import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import HorizontalTimeline from 'react-horizontal-timeline';
import TimelineProvider from 'providers/timeline-provider';

import styles from './country-timeline-styles.scss';

class CountryTimeline extends PureComponent {
  constructor() {
    super();
    this.state = {
      index: null,
      previous: 0,
      open: false
    };
  }

  getLabel(year, index) {
    const { documents } = this.props;
    let content = null;
    if (this.state.open && this.state.index === index) {
      content = (
        <ClickOutside onClickOutside={this.closeTooltip}>
          <ul className="links">
            {documents[year].map(document => (
              <li key={document.link}>
                <a
                  className={styles.documentLink}
                  key={document.link}
                  target="_blank"
                  href={document.link}
                >
                  {document.label}
                </a>
              </li>
            ))}
          </ul>
        </ClickOutside>
      );
    }
    return (
      <div className={`timelineTooltip ${content ? '-open' : ''}`}>
        {content}
        <span className="yearLabel">{year}</span>
      </div>
    );
  }

  closeTooltip = () => {
    this.setState({ open: false });
  };

  render() {
    const { documentYears } = this.props;
    const { index: currentIndex } = this.state;
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <TimelineProvider />
          <h3 className={styles.timelineDescription}>
            Timeline of UNFCCC Document Submissions
          </h3>
          {documentYears && documentYears.length > 0 ? (
            <HorizontalTimeline
              index={
                currentIndex === 0
                  ? 0
                  : currentIndex || documentYears.length - 1
              }
              indexClick={index => {
                this.setState({
                  index,
                  previous: currentIndex,
                  open: true
                });
              }}
              getLabel={(year, index) => this.getLabel(year, index)}
              values={documentYears}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

CountryTimeline.propTypes = {
  documents: PropTypes.object,
  documentYears: PropTypes.array
};

export default CountryTimeline;
