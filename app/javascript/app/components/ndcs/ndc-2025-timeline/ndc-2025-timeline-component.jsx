import React, { PureComponent } from 'react';
import { utcFormat } from 'd3-time-format';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import HorizontalTimeline from 'react-horizontal-timeline';
import cx from 'classnames';
import AbbrReplace from 'components/abbr-replace';
import styles from './ndc-2025-timeline-styles.scss';

class CountryTimeline extends PureComponent {
  constructor() {
    super();
    this.state = {
      index: null,
      previous: 0,
      open: false
    };
  }

  getLabel(date, index) {
    const { documents } = this.props;
    let content = null;
    const countries = documents[index].countries;
    const formatDate = utcFormat('%b %d %Y');
    const formattedDate = formatDate(new Date(date));
    if (this.state.open && this.state.index === index) {
      content = (
        <ClickOutside onClickOutside={this.closeTooltip}>
          <ul className="links">
            {countries.map(c => (
              <li key={c.location?.wri_standard_name}>
                <a className={styles.url} target="_blank" href={c.url}>
                  <AbbrReplace>
                    {c.submission} {c.location?.wri_standard_name}
                  </AbbrReplace>
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
        <div className="timelineLabel">
          <span className="yearLabel">{formattedDate}</span>
          <ul className="yearLabel">
            {countries.map(c => (
              <li key={c.location?.wri_standard_name}>
                {c.location?.wri_standard_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  closeTooltip = () => {
    this.setState({ open: false });
  };
  render() {
    if (!this.props.documentYears) return null;

    const { documentYears } = this.props;
    const { index: currentIndex, open } = this.state;
    return (
      <div
        className={cx(styles.timelineContainer, { [styles.opened]: open })}
        data-tour="countries-01"
      >
        <div className={styles.timeline}>
          <h3 className={styles.timelineDescription}>
            <AbbrReplace>Latest NDC Submissions</AbbrReplace>
          </h3>
          {documentYears?.length > 0 ? (
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
              getLabel={(date, index) => this.getLabel(date, index)}
              values={documentYears}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

CountryTimeline.propTypes = {
  documents: PropTypes.array,
  documentYears: PropTypes.array
};

export default CountryTimeline;
