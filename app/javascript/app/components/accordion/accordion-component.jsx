import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import qs from 'query-string';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './accordion-styles.scss';

class Accordion extends Component {
  handleOnClick(slug) {
    const { location, history } = this.props;
    const search = qs.parse(location.search);
    const newSlug =
      !search.activeSection || search.activeSection === slug ? 'none' : slug;
    const newSearch = { ...search, activeSection: newSlug };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  }

  render() {
    const { location, data } = this.props;
    const search = qs.parse(location.search);
    const activeSection = search.activeSection ? search.activeSection : null;
    return (
      <div>
        {data.map((section, index) =>
          (<section key={section.slug} className={styles.accordion}>
            <button
              className={styles.header}
              onClick={() => this.handleOnClick(section.slug)}
            >
              <div className={layout.content}>
                <div className={styles.title}>
                  {section.title}
                  <Icon
                    icon={dropdownArrow}
                    className={cx(styles.iconArrow, {
                      [styles.isOpen]: activeSection === section.slug
                    })}
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
                    {section.definitions.map(def =>
                      (<div className={styles.definition} key={def.title}>
                        <dt className={styles.definitionTitle}>
                          {def.title}
                        </dt>
                        <dd className={styles.definitionDesc}>
                          {def.description}
                        </dd>
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
  location: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      definitions: PropTypes.array.isRequired
    })
  )
};

export default Accordion;
