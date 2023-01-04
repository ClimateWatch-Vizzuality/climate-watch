/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Button from 'components/button';
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

    const renderLink = (text, title, link) => (
      <a className={styles.descriptionLink} href={link} title={title}>
        {text}
      </a>
    );

    const description = (
      <div className={styles.description}>
        <p>
          Human-caused greenhouse gas (GHG) emissions drive climate change.{' '}
          About 60% of GHG emissions come{' '}
          {renderLink(
            'from just 10 countries',
            'About 60% of GHG emissions come from just 10 countries',
            '/ghg-emissions?chartType=percentage'
          )}
          , while the 100 least-emitting contributed less than 3%. Energy makes
          up{' '}
          {renderLink(
            'nearly three-quarters of global emissions',
            'Energy makes up nearly three-quarters of global emissions',
            '/ghg-emissions?breakBy=sector&chartType=percentage' // TODO: not sure if source param is needed here, should be new Climate Watch if it is
          )}
          , followed by agriculture. Within the energy sector, the{' '}
          {renderLink(
            'largest emitting sector is electricity and heat generation',
            'Largest emitting sector is electricity and heat generation',
            '/ghg-emissions?breakBy=sector&chartType=percentage&sectors=agriculture%2Cindustrial-processes%2Cland-use-change-and-forestry%2Cbuilding%2Celectricity-heat%2Cfugitive-emissions%2Cmanufacturing-construction%2Cother-fuel-combustion%2Ctransportation%2Cwaste'
          )}{' '}
          , followed by transportation and manufacturing. Land use, land
          use-change and forestry (LULUCF) is both a source and sink of
          emissions and key sector to get to net-zero emissions.
        </p>
        <p className={styles.learnMore} data-tour="ghg-05">
          Learn more about our data sources (CAIT, PIK, UNFCCC, GCP) and
          methodologies in our{' '}
          {renderLink(
            'Frequently asked questions',
            'Frequently asked questions',
            '/about/faq/ghg'
          )}
          .
        </p>
      </div>
    );

    return (
      <div>
        {!isPageContained && (
          <Header route={route}>
            <div className={cx(layout.content, styles.header)}>
              <div>
                <div className={styles.introContainer}>
                  <Intro title="Historical GHG Emissions" />
                  <div className={styles.buttons}>
                    <Button
                      variant="primary"
                      link="/about/faq/ghg"
                      className="header-button"
                    >
                      Learn more in FAQ
                    </Button>
                    <Button
                      variant="primary"
                      link="/key-visualizations"
                      className="header-button"
                    >
                      Key Visualizations
                    </Button>
                  </div>
                </div>
                {description}
              </div>
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
