import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './about-partners-styles.scss';

const AboutPartners = ({ sections }) => (
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
                <div
                  className={styles.partner}
                  key={partner.alt ? partner.alt : partner.img.alt}
                >
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
                    {partner.alt && (
                      <div className={styles.linkLabel} key={partner.id}>
                        {partner.alt}
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
);

AboutPartners.propTypes = {
  sections: PropTypes.array.isRequired
};

export default AboutPartners;
