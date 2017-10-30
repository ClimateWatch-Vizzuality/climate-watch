import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import NoContent from 'components/no-content';
import cx from 'classnames';
import Loading from 'components/loading';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './ndc-country-accordion-styles.scss';

class Accordion extends PureComponent {
  render() {
    const {
      data,
      handleOnClick,
      activeSection,
      compare,
      loading,
      sectors
    } = this.props;
    return (
      <div className={styles.wrapper}>
        {loading && <Loading light className={styles.loader} />}
        {!data.length && !loading && (
          <NoContent
            className={styles.noContent}
            message="No content for that category"
            icon
          />
        )}
        {!loading &&
          data &&
          data.map((section, index) => {
            let isOpen = index === 0;
            if (activeSection) {
              if (activeSection !== 'none') {
                const isActiveInResults = data.some(
                  d => d.slug === activeSection
                );
                isOpen =
                  activeSection === section.slug ||
                  (index === 0 && !isActiveInResults);
              } else {
                isOpen = false;
              }
            }
            return section.definitions.length ? (
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
                    <dl className={styles.definitionList}>
                      {section.definitions.map(
                        def =>
                          (!Array.isArray(def.descriptions) ? (
                            <section key={`${def.slug}-${section.slug}`}>
                              <button
                                className={cx(styles.header, styles.subHeader)}
                                onClick={() => handleOnClick(section.slug)}
                              >
                                <div className={layout.content}>
                                  <div className={styles.title}>
                                    {def.title}
                                  </div>
                                </div>
                              </button>
                              <Collapse isOpened>
                                <div className={styles.definitions}>
                                  {Object.keys(def.descriptions).map(sector => (
                                    <div
                                      key={sector}
                                      className={layout.content}
                                    >
                                      <div
                                        className={cx(
                                          compare
                                            ? styles.definitionCompare
                                            : styles.definition,
                                          styles.thirdLevel
                                        )}
                                      >
                                        <dt className={styles.definitionTitle}>
                                          {sectors && sectors[sector].name}
                                        </dt>
                                        {def.descriptions[sector].map(desc => (
                                          <dd
                                            key={`${desc.iso}-${desc.value}`}
                                            className={styles.definitionDesc}
                                          >
                                            <div
                                              dangerouslySetInnerHTML={{ // eslint-disable-line
                                                __html: desc.value
                                              }} 
                                            />
                                          </dd>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </Collapse>
                            </section>
                          ) : (
                            <div
                              key={`${def.slug}-${section.slug}`}
                              className={layout.content}
                            >
                              <div
                                className={cx(
                                  compare
                                    ? styles.definitionCompare
                                    : styles.definition
                                )}
                              >
                                <dt className={styles.definitionTitle}>
                                  {def.title}
                                </dt>
                                {def.descriptions.map(
                                  desc =>
                                    (
                                      <dd
                                        key={`${def.slug}-${desc.iso}`}
                                        className={styles.definitionDesc}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{  // eslint-disable-line
                                            __html: desc.values
                                              ? desc.values[0].value
                                              : null
                                          }}
                                        />
                                      </dd>
                                    )
                                )}
                              </div>
                            </div>
                          ))
                      )}
                    </dl>
                  </div>
                </Collapse>
              </section>
            ) : null;
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
  loading: PropTypes.bool,
  sectors: PropTypes.object
};

Accordion.defaultProps = {
  data: []
};

export default Accordion;
