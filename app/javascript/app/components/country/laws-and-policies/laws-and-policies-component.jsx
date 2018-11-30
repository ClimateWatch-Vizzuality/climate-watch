import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';
import layout from 'styles/layout.scss';
import SlideCards from 'components/slide-cards';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import LawsAndPoliciesProvider from 'providers/laws-and-policies-provider';
import cx from 'classnames';
import { Desktop, TabletLandscapeOnly } from 'components/responsive';

import styles from './laws-and-policies-styles.scss';

class LawsAndPolicies extends PureComponent {
  handleSourceChange = sector => {
    const { updateUrlParam } = this.props;
    updateUrlParam(
      {
        name: 'sector',
        value: sector.value
      },
      true
    );
  };

  handleInfoOnClick = () => {
    this.props.setModalMetadata({
      category: 'Country',
      slugs: ['national_laws_politices', 'ndc_cw'],
      customTitle: 'Targets in Laws and Policies',
      open: true
    });
  };

  renderActionToolbar = () => {
    const {
      sectors,
      currentSector,
      country,
      nationalPoliciesCount
    } = this.props;

    const countryName = country && `${country.wri_standard_name}`;

    return (
      <div className={styles.actions}>
        <Dropdown
          wrapperClassName={styles.dropdownWrapper}
          className={styles.dropdown}
          label="Filter by sector"
          options={sectors}
          onValueChange={this.handleSourceChange}
          value={currentSector}
          disclaimer={`${nationalPoliciesCount} ${nationalPoliciesCount === 1
            ? 'national law and policy'
            : 'national laws and policies'} with targets available for ${countryName} for the selected sector`}
          hideResetButton
        />
        <div className={styles.buttonContainer}>
          <ButtonGroup
            className={styles.buttonGroup}
            buttonsConfig={[
              {
                type: 'info',
                onClick: this.handleInfoOnClick
              }
            ]}
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      cardsInRow,
      ndcContent,
      lawsTargets,
      countryProfileLink,
      currentSector,
      country,
      isInEu,
      lawsAndPoliciesCount
    } = this.props;

    const countryName = country && `${country.wri_standard_name}`;
    const countryIso = country && country.iso_code3;
    const ndcContentPresent = !isEmpty(ndcContent);
    const linkForEUcountries = `${window.location.protocol}//${window.location
      .host}/ndcs/country/EU28/`;
    const linkForOtherCountries = `${window.location.protocol}//${window
      .location.host}/ndcs/country/${countryIso}/`;

    return (
      <div className={layout.content}>
        <div className={styles.descriptionContainer}>
          <div className="grid-column-item">
            <h3 className={styles.title}>Targets in Laws and Policies</h3>
            <div>
              This table compares quantified targets in countries’ submitted
              NDCs with targets in relevant national laws and policies. The
              purpose is to indicate the level of alignment.
            </div>
            <Desktop>{this.renderActionToolbar()}</Desktop>
          </div>
          <div className={styles.logoContainer}>
            {
              // eslint-disable-next-line jsx-a11y/anchor-has-content
            }
            <a
              href={countryProfileLink}
              className={styles.logo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className={styles.logoText}
              >{`See all ${lawsAndPoliciesCount} national laws and policies in ${countryName} on Climate Change Laws of the World.`}</span>
            </a>
          </div>
          <TabletLandscapeOnly>
            {this.renderActionToolbar()}
          </TabletLandscapeOnly>
        </div>
        <div className={styles.cardsContainer}>
          {ndcContentPresent ? (
            <Card
              contentFirst
              theme={{
                card: styles.fixedCard,
                contentContainer: styles.fixedCardContentContainer,
                title: styles.fixedCardTitle,
                data: styles.fixedCardData
              }}
              title={{
                title: 'Targets in Submitted NDC',
                link: isInEu ? linkForEUcountries : linkForOtherCountries
              }}
            >
              <CardRow
                title="Targets type"
                description={ndcContent.type || 'Target type not defined'}
              />
              <CardRow
                title="Targets"
                subtitle="Economy-wide targets"
                description={ndcContent.description}
              />
            </Card>
          ) : (
            <div className={cx(styles.fixedCard, styles.noContent)}>
              {currentSector &&
                currentSector.value &&
                `There are no ${currentSector.value} targets found in the NDC`}
            </div>
          )}
          {lawsTargets && lawsTargets.length ? (
            <SlideCards cards={lawsTargets} cardsInRow={cardsInRow} />
          ) : (
            <div className={styles.noContent}>
              {currentSector &&
                currentSector.value &&
                `There are no ${currentSector.value} targets found in laws and policies`}
            </div>
          )}
        </div>
        <ModalMetadata />
        <LawsAndPoliciesProvider />
      </div>
    );
  }
}

LawsAndPolicies.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  sectors: PropTypes.array,
  ndcContent: PropTypes.object,
  lawsTargets: PropTypes.array.isRequired,
  cardsInRow: PropTypes.number,
  currentSector: PropTypes.object,
  country: PropTypes.object,
  isInEu: PropTypes.bool,
  updateUrlParam: PropTypes.func.isRequired,
  countryProfileLink: PropTypes.string,
  lawsAndPoliciesCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  nationalPoliciesCount: PropTypes.number
};

export default LawsAndPolicies;
