import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header';
import Intro from 'components/intro';

import background from 'assets/backgrounds/home_bg_1';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const About = ({ sections }) => (
  <div>
    <Header image={background}>
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
          <div className={styles.partners}>
            {section.partners &&
              section.partners.map(partner => (
                <a
                  key={partner.link}
                  className={styles.partner}
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
                    <p className={styles.partnerText} key={partner.text}>
                      {partner.text}
                    </p>
                  )}
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

About.propTypes = {
  sections: PropTypes.array.isRequired
};

export default About;
