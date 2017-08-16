import React from 'react';
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

const Accordion = (props) => {
  const { location } = props;
  console.info(location);
  const search = qs.parse(location.search);
  const activeSection = search.activeSection ? search.activeSection : null;
  return (
    <div>
      {data.map(section =>
        (<Collapse
          key={section.slug}
          className={styles.accordion}
          isOpened={activeSection === section.slug}
        >
          <section>
            <div className={styles.header}>
              {section.title}
            </div>
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
          </section>
        </Collapse>)
      )}
    </div>
  );
};

Accordion.propTypes = {
  location: PropTypes.object
};

export default Accordion;
