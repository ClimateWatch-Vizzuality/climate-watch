import React from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';
import styles from './about-styles.scss';

const About = ({ sections }) => (
  <div className={layout.content}>
    {sections.map(section => (
      <div key={section.title} className={styles.section}>
        <h2 className={styles.title}>{section.title}</h2>
        {section.partners &&
          section.partners.map(partner => {
            if (partner.img) {
              return (
                <img
                  key={partner.img.alt}
                  src={partner.img.src}
                  alt={partner.img.alt}
                />
              );
            }
            if (partner.text) {
              return (
                <p className={styles.partnerText} key={partner.text}>
                  {partner.text}
                </p>
              );
            }
            return null;
          })}
      </div>
    ))}
  </div>
);

About.propTypes = {
  sections: PropTypes.array.isRequired
};

export default About;
