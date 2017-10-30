import React from 'react';
import styles from './about-description-styles.scss';

const About = () => (
  <div className={styles.aboutDescription}>
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
    Climate Watch is an online platform designed to empower policymakers,
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
        Data and visualizations on all countries’ greenhouse gas emissions;
      </li>
      <li>
        A comprehensive, user-friendly database of all countries’ Nationally
        Determined Contributions (NDCs);
      </li>
      <li>
        Comprehensive mapping of linkages between Nationally Determined
        Contributions (NDCs) and the Sustainable Development Goals (SDGs) and
        associated targets of the 2030 Agenda for Sustainable Development.
      </li>
      <li>
        Data and visuals of emissions scenario pathways for major emitting
        countries, derived from a growing library of models;
      </li>
      <li>
        National and sectoral profile pages that offer a snapshot of climate
        progress, risks and vulnerabilities; and
      </li>
      <li>
        The ability to download data and create, save and share customized data
        visualizations through My Climate Watch.
      </li>
    </ul>
    <p>
      Climate Watch is implemented by{' '}
      <a href="www.wri.org" target="_blank" className={styles.link}>
        World Resources Institute
      </a>{' '}
      in collaboration with partners.
    </p>
  </div>
);

export default About;
