/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { renderToString } from 'react-dom/server';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';

import layout from 'styles/layout.scss';
import styles from './ndc-2025-tracker-styles.scss';
import Ndc2025Timeline from '../../components/ndcs/ndc-2025-timeline/ndc-2025-timeline';

const NetZero = ({ route }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="2025 NDC Tracker"
              description={renderToString(
                <React.Fragment>
                  <div className={styles.descriptionLine}>
                    The Paris Agreement calls on countries to deliver new
                    Nationally Determined Contributions (NDCs) every five years
                    that are informed by the latest advances in technology,
                    science and shifting economic trends.
                  </div>
                </React.Fragment>
              )}
            />
          </div>
          <div>
            <Ndc2025Timeline />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      {route.sections &&
        route.sections.length > 0 &&
        route.sections.map(section => (
          <div key={section.label} className={styles.section}>
            <div id={section.hash} className={styles.sectionHash} />
            <section.component />
          </div>
        ))}
    </div>
    <CountriesProvider />
    <RegionsProvider />
  </div>
);

NetZero.propTypes = {
  route: Proptypes.object.isRequired
};

export default NetZero;
