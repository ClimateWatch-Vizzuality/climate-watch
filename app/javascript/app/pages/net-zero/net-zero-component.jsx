/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { renderToString } from 'react-dom/server';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';

import layout from 'styles/layout.scss';
import styles from './net-zero-styles.scss';

const NetZero = ({ route }) => (
  <div>
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Net-Zero Tracker"
              description={renderToString(
                <React.Fragment>
                  <div className={styles.descriptionLine}>
                    To avoid the worst climate impacts, global greenhouse gas
                    (GHG) emissions must be slashed in half during the next
                    decade and reach net-zero early in the second half of the
                    century. Given this need, a growing number of Parties to the
                    Paris Agreement are adopting net-zero emissions targets.
                    This tracker presents the net-zero targets that have been
                    communicated in a Party’s nationally determined contribution
                    (NDC), long-term low GHG emissions development strategy
                    (LTS), domestic law, policy, or high-level political pledge
                    such as head of state commitment.
                  </div>
                </React.Fragment>
              )}
            />
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
