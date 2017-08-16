import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import qs from 'query-string';

import styles from './accordion-styles.scss';

const data = [
  {
    title: 'Section 1',
    slug: 'mysection1',
    definitions: [
      {
        title: 'coasa',
        description: 'fdassadsadas'
      }
    ]
  },
  {
    title: 'Section 2',
    slug: 'mysection2',
    definitions: [
      {
        title: 'coasa',
        description: 'fdassadsadas'
      }
    ]
  }
];

class Accordion extends Component {
  handleOnClick = (slug) => {
    const { location, history } = this.props;
    const search = qs.parse(location.search);
    search.activeSection = slug;
    history.push({
      pathname: location.pathname,
      search: qs.stringify(search)
    });
  };

  render() {
    const { location } = this.props;
    const search = qs.parse(location.search);
    const activeSection = search.activeSection ? search.activeSection : null;
    return (
      <div>
        {data.map((section, index) =>
          (<section key={section.slug}>
            <button
              className={styles.header}
              onClick={() => this.handleOnClick(section.slug)}
            >
              {section.title}
            </button>
            <Collapse
              className={styles.accordion}
              isOpened={
                activeSection === section.slug ||
                (index === 0 && !activeSection)
              }
            >
              <div className={styles.body}>
                <dl>
                  {section.definitions.map(def =>
                    (<div key={def.title}>
                      <dt>
                        {def.title}
                      </dt>
                      <dd>
                        {def.description}
                      </dd>
                    </div>)
                  )}
                </dl>
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
  history: PropTypes.object
};

export default Accordion;
