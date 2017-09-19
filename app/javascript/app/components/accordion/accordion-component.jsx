import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import NoContent from 'components/no-content';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './accordion-styles.scss';

class Accordion extends PureComponent {
  render() {
    const { data, handleOnClick, activeSection, compare, loading } = this.props;
    return (
      <div>
        {!data.length && !loading && <NoContent message="Nothing here" />}
        {data.map((section, index) => {
          let isOpen = false;
          if (data.length === 1) {
            isOpen = true;
          } else {
            isOpen =
              activeSection || data.length === 1
                ? activeSection === section.slug
                : index === 0;
          }
          return (
            <section key={section.slug} className={styles.accordion}>
              <button
                className={styles.header}
                onClick={() => handleOnClick(section.slug)}
              >
                <div className={layout.content}>
                  <div className={styles.title}>
                    {section.title}
                    <Icon
                      icon={dropdownArrow}
                      className={cx(styles.iconArrow, {
                        [styles.isOpen]: isOpen
                      })}
                    />
                  </div>
                </div>
              </button>
              <Collapse isOpened={isOpen}>
                <div className={styles.accordionContent}>
                  <div className={layout.content}>
                    <dl className={styles.definitionList}>
                      {section.definitions.map(def => (
                        <div
                          key={def.slug}
                          className={cx(
                            compare
                              ? styles.definitionCompare
                              : styles.definition
                          )}
                        >
                          <dt className={styles.definitionTitle}>
                            {def.title}
                          </dt>
                          {def.descriptions.map(desc => (
                            <dd
                              key={`${def.slug}-${desc.iso}`}
                              className={styles.definitionDesc}
                            >
                              <div
                                dangerouslySetInnerHTML={{ __html: desc.value }} // eslint-disable-line
                              />
                            </dd>
                          ))}
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Collapse>
            </section>
          );
        })}
      </div>
    );
  }
}

Accordion.propTypes = {
  activeSection: PropTypes.string,
  handleOnClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      definitions: PropTypes.array.isRequired
    })
  ),
  compare: PropTypes.bool,
  loading: PropTypes.bool
};

Accordion.defaultProps = {
  data: []
};

export default Accordion;
