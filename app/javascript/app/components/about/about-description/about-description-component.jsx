/* eslint-disable no-irregular-whitespace */
import React from 'react';
import layout from 'styles/layout';
import cx from 'classnames';
import { SEO_PAGES } from 'data/seo-data';
import { PropTypes } from 'prop-types';
import SEOTags from 'components/seo-tags';
import styles from './about-description-styles.scss';

const About = ({ location }) => (
  <div className={cx(layout.content, styles.aboutDescription)}>
    <SEOTags page={SEO_PAGES.about} href={location.href} />
    <p>
      Climate Watch is an online platform designed to empower policymakers,
      researchers, media and other stakeholders with the open climate data,
      visualizations and resources they need to gather insights on national and
      global progress on climate change.
    </p>
    <p>
      Climate Watch brings together dozens of datasets for the first time to let
      users analyze and compare the Nationally Determined Contributions (NDCs)
      under the Paris Agreement, access historical emissions data, discover how
      countries can leverage their climate goals to achieve their sustainable
      development objectives, and use models to map new pathways to a lower
      carbon, prosperous future.
    </p>
    <p>
      This free platform enables users to create and share custom data
      visualizations and comparisons of national climate commitments. It
      contributes to the goals of the Paris Agreement by using open data to
      increase transparency and accountability, and provide actionable analysis
      on how countries can enhance their efforts to combat climate change.
    </p>
    <h3>Climate Watch includes:</h3>
    <ul>
      <li>
        <a href="/ghg-emissions" className={styles.link}>
          Data and visualizations on all countries’ greenhouse gas emissions
        </a>
        ;
      </li>
      <li>
        <a href="/ndcs-content" className={styles.link}>
          A comprehensive, user-friendly database of all countries’ Nationally
          Determined Contributions (NDCs)
        </a>
        ;
      </li>
      <li>
        <a href="/ndcs-sdg" className={styles.link}>
          Comprehensive mapping of linkages between Nationally Determined
          Contributions (NDCs) and the Sustainable Development Goals (SDGs) and
          associated targets of the 2030 Agenda for Sustainable Development
        </a>
        ;
      </li>
      <li>
        <a href="/pathways" className={styles.link}>
          Data and visuals of emissions scenario pathways for major emitting
          countries, derived from a growing library of models
        </a>
        ;
      </li>
      <li>
        <a href="/countries" className={styles.link}>
          National and sectoral profile pages that offer a snapshot of climate
          progress, risks and vulnerabilities
        </a>
        ; and
      </li>
      <li>
        The ability to download data and create, save and share customized data
        visualizations through My Climate Watch.
      </li>
    </ul>
    <p>
      Climate Watch is managed by{' '}
      <a
        href="//www.wri.org"
        target="_blank"
        className={styles.link}
        rel="noopener noreferrer"
      >
        World Resources Institute
      </a>
      . It is a contribution to the{' '}
      <a
        href="//ndcpartnership.org/"
        target="_blank"
        className={styles.link}
        rel="noopener noreferrer"
      >
        NDC Partnership
      </a>
      .
    </p>
  </div>
);

About.propTypes = {
  location: PropTypes.object
};

export default About;
