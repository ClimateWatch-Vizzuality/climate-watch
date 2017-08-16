import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import cx from 'classnames';
import qs from 'query-string';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './accordion-styles.scss';

class Accordion extends Component {
  handleOnClick = (slug) => {
    const { location, history } = this.props;
    const newSearch = { ...this.props.search, activeSection: slug };
    history.push({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  render() {
    const {
      data,
      country,
      activeSection,
      compare,
      countriesToCompare
    } = this.props;
    return (
      <div>
        {data[country].map((section, index) =>
          (<section key={section.slug} className={styles.accordion}>
            <button
              className={styles.header}
              onClick={() => this.handleOnClick(section.slug)}
              disabled={activeSection === section.slug}
            >
              <div className={layout.content}>
                <div className={styles.title}>
                  {section.title}
                  {compare &&
                    <div>
                      <span>
                        {countriesToCompare[0] || 'none'},{' '}
                      </span>
                      <span>
                        {countriesToCompare[1] || 'none'}
                      </span>
                    </div>}
                  <Icon
                    icon={dropdownArrow}
                    className={cx(
                      { [styles.isOpen]: activeSection === section.slug },
                      styles.iconArrow
                    )}
                  />
                </div>
              </div>
            </button>
            <Collapse
              isOpened={
                activeSection === section.slug ||
                (index === 0 && !activeSection)
              }
            >
              <div className={styles.accordionContent}>
                <div className={layout.content}>
                  <dl className={styles.definitionList}>
                    {section.definitions.map((def, defIndex) =>
                      (<div className={styles.definition} key={def.title}>
                        <dt className={styles.definitionTitle}>
                          {def.title}
                        </dt>
                        <dd
                          className={
                            compare
                              ? styles.definitionCompare
                              : styles.definitionDesc
                          }
                        >
                          {def.description}
                        </dd>
                        {compare &&
                          <div className={styles.compare}>
                            <dd className={styles.definitionCompare}>
                              {data[countriesToCompare[0]]
                                ? data[countriesToCompare[0]][index]
                                    .definitions[defIndex].description
                                : ''}
                            </dd>
                            <dd className={styles.definitionCompare}>
                              {data[countriesToCompare[1]]
                                ? data[countriesToCompare[1]][index]
                                    .definitions[defIndex].description
                                : ''}
                            </dd>
                          </div>}
                      </div>)
                    )}
                  </dl>
                </div>
              </div>
            </Collapse>
          </section>)
        )}
      </div>
    );
  }
}

Accordion.propTypes = {
  data: PropTypes.object.isRequired,
  country: PropTypes.string,
  activeSection: PropTypes.string,
  compare: PropTypes.bool,
  countriesToCompare: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
  search: PropTypes.object
};

export default Accordion;
