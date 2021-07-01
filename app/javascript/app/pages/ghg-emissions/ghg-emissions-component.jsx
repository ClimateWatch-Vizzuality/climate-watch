import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Header from 'components/header';
import Intro from 'components/intro';
import GhgEmissionsGraph from 'components/ghg-emissions';
import { isPageContained } from 'utils/navigation';

import layout from 'styles/layout.scss';
import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { route } = this.props;
    // Intro component is parsing html from the description so a react component won't work here
    const renderLink = (text, title, link) =>
      `<a href=${link} title="${title}">${text}</a>`;
    const description = `<p>Greenhouse gas (GHG) emissions which cause climate change
      ${renderLink(
    'have increased 50 fold since the mid-1800s.',
    'Greenhouse gas (GHG) emissions which cause climate change have increased 50 fold since the mid-1800s.',
    '/ghg-emissions?chartType=area&source=PIK'
  )}
       Energy makes up
      ${renderLink(
    'nearly three-quarters of global emissions',
    'Energy makes up nearly three-quarters of global emissions',
    '/ghg-emissions?breakBy=sector&chartType=percentage&source=CAIT'
  )}, followed by agriculture. Breaking down the energy sector into its sub-sectors, ${renderLink(
  'electricity and heat generation make up the largest portion of emissions, followed by transportation and manufacturing.',
  'Electricity and heat generation make up the largest portion of emissions, followed by transportation and manufacturing.',
  '/ghg-emissions?breakBy=sector&chartType=percentage&sectors=agriculture%2Cindustrial-processes%2Cland-use-change-and-forestry%2Cbuilding%2Celectricity-heat%2Cfugitive-emissions%2Cmanufacturing-construction%2Cother-fuel-combustion%2Ctransportation%2Cwaste'
)}
     64% of GHG emissions come ${renderLink(
    'from just 10 countries',
    '64% of GHG emissions come from just 10 countries',
    '/ghg-emissions?chartType=percentage'
  )}, while the 100 least-emitting contributed less than 3%.</p><p class="${
  styles.learnMore
}">
      Learn more about our data sources (CAIT, PIK, UNFCCC,
      GCP), economic sectors, consumption based emissions and methodologies in our ${renderLink(
    'Frequently asked questions',
    'Frequently asked questions',
    '/about/faq/ghg'
  )}
    </p>`;

    return (
      <div>
        {!isPageContained && (
          <Header route={route}>
            <div className={cx(layout.content, styles.header)}>
              <Intro
                title="Historical GHG Emissions"
                description={description}
              />
            </div>
          </Header>
        )}
        <div className={styles.wrapper}>
          <div className={layout.content}>
            <GhgEmissionsGraph />
          </div>
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  route: PropTypes.object.isRequired
};

export default GhgEmissions;
