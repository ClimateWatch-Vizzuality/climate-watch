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
    <div>
      {sections.map(section => (
        <div key={section.title} className={styles.section}>
          <div className={layout.content}>
            <h2 className={styles.title}>{section.title}</h2>
            <div
              className={cx(styles.partners, {
                [styles.additionalData]: section.type === 'onlyLinks'
              })}
            >
              {section.partners &&
                section.partners.map(partner => (
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
                      {partner.text && (
                        <div className={styles.linkLabel} key={partner.id}>
                          {partner.text}
                        </div>
                      )}
                    </a>
                    {partner.description && (
                      <div className={styles.description} key={partner.id}>
                        {partner.description}
                      </div>
                    )}
                  </div>
                ))}
            </div>
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
