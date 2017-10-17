import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const About = ({ route, sections }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <Intro
          title="About"
          description="Climate Watch is an interactive tool that aims to improve understanding of the possible policy and development paths that could lead to decarbonization of the economy in different countries by providing high-quality, global data."
        />
      </div>
    </Header>
    <div className={layout.content}>
      {sections.map(section => (
        <div key={section.title} className={styles.section}>
          <h2 className={styles.title}>{section.title}</h2>
          <div
            className={cx(styles.partners, {
              [styles.additionalData]: section.id === 'additional-data'
            })}
          >
            {section.partners &&
              section.partners.map(
                partner =>
                  (section.id === 'additional-data' ? (
                    <div className={styles.partner} key={partner.id}>
                      <a
                        className={styles.link}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.text && (
                          <div
                            className={styles.additionalDataLink}
                            key={partner.id}
                          >
                            {partner.text}
                          </div>
                        )}
                      </a>
                    </div>
                  ) : (
                    <div className={styles.partner} key={partner.id}>
                      <a
                        className={styles.link}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {partner.img && (
                          <img
                            key={partner.img.alt}
                            src={partner.img.src}
                            alt={partner.img.alt}
                          />
                        )}
                      </a>
                      {partner.text && (
                        <div className={styles.text} key={partner.id}>
                          {partner.text}
                        </div>
                      )}
                    </div>
                  ))
              )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

About.propTypes = {
  route: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired
};

export default About;
