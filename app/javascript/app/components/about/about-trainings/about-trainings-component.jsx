import React from 'react';
import cx from 'classnames';
import ReactPlayer from 'react-player';
import layout from 'styles/layout';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import AbbrReplace from 'components/abbr-replace';
import styles from './about-trainings-styles.scss';

const AboutTrainings = () => (
  <div className={cx(layout.content, styles.aboutTrainings)}>
    <SEOTags page={SEO_PAGES.aboutTrainings} href={location.href} />
    <AbbrReplace>
      <p>
        Climate Watch offers open trainings on a regular basis to connect with
        users and explain how to make the best use of the platform and all its
        data. During the trainings, the Climate Watch team shares the latest
        developments and updates on the tool and allocates plenty of time to
        respond to questions.
      </p>
      <p>
        Subscribe to our{' '}
        <a
          href="https://www.climatewatchdata.org/about/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          monthly newsletter
        </a>{' '}
        to find out when the next training will take place.
      </p>
      <p>
        For any questions about our trainings, please contact{' '}
        <a
          href="mailto:leandro.vigna@wri.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          leandro.vigna@wri.org
        </a>
      </p>
      <p className={styles.recordingIntro}>
        You can watch a recording of one of our trainings here:
      </p>
      <ReactPlayer
        className={styles.video}
        width="100%"
        height="500px"
        url="https://www.youtube.com/watch?v=jUIAICboxrY"
        controls
        config={{
          youtube: {
            preload: true
          }
        }}
      />
      <p className={styles.bold}>Speakers:</p>
      <ul>
        <li>
          <span className={styles.name}>Leandro Vigna</span>, Data Partnerships
          and Outreach Manager, Climate Watch, World Resources Institute
        </li>
        <li>
          <span className={styles.name}>Mengpin Ge</span>, Associate, Climate
          Program, World Resources Institute
        </li>
        <li>
          <span className={styles.name}>Mollie Freeman</span>, Social Media
          Specialist, Climate Program, World Resources Institute (Moderator)
        </li>
      </ul>
      <p className={styles.recordingIntro}>
        A recording of a training conducted in Spanish is available here:
      </p>
      <ReactPlayer
        className={styles.video}
        width="100%"
        height="500px"
        url="https://www.youtube.com/watch?v=dKCU1R5-pNE"
        controls
        config={{
          youtube: {
            preload: true
          }
        }}
      />
      <p className={styles.bold}>Speakers:</p>
      <ul>
        <li>
          <span className={styles.name}>Daniel Galvan Perez</span>, Technical
          Officer, Regional Collaboration Centre for Latin America, (UNFCCC -
          UNEP)
        </li>
        <li>
          <span className={styles.name}>Leandro Vigna</span>, Data Partnerships
          and Outreach Manager, Climate Watch, World Resources Institute
        </li>
        <li>
          <span className={styles.name}>Jamie Bindon</span>, Enhancement
          Knowledge Specialist, NDC Partnership
        </li>
        <li>
          <span className={styles.name}>Molly McGregor</span>, Knowledge Tools &
          Research Associate, NDC Partnership
        </li>
      </ul>
    </AbbrReplace>
  </div>
);

export default AboutTrainings;
