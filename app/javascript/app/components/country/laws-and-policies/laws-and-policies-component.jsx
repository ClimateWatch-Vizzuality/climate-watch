import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';
import SlideCards from 'components/slide-cards';
import ModalMetadata from 'components/modal-metadata';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Card from 'components/card';
import CardRow from 'components/card/card-row';
import LawsAndPoliciesProvider from 'providers/laws-and-policies-provider';
import cx from 'classnames';

import styles from './laws-and-policies-styles.scss';

class LawsAndPolicies extends PureComponent {
  handleSourceChange = () => {
    // TODO: Implement once API is ready
  };

  handleInfoOnClick = () => {
    // TODO: Change the slugs when laws and policies metadata is ready
    this.props.setModalMetadata({
      category: 'Country',
      slugs: 'ndc_sdc_all indicators',
      customTitle: 'Laws and Policies',
      open: true
    });
  };

  render() {
    const { cards, cardsInRow } = this.props;

    const ndcContentPresent = true;

    return (
      <div className={layout.content}>
        <h3 className={styles.title}>Laws and Policies</h3>
        <div className={styles.descriptionContainer}>
          <div className="grid-column-item">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
            sollicitudin laoreet viverra, tortor libero sodales leo, eget
            blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse
            potenti. Sed egestas, ante et vulputate volutpat, eros pede semper
            est, vitae luctus metus libero eu augue. Morbi purus libero,
            faucibus adipiscing, commodo quis, gravida id.
          </div>
          <div className={styles.logoContainer}>
            {
              // eslint-disable-next-line jsx-a11y/anchor-has-content
            }<a
              href={'lselink'}
              className={styles.logo}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Dropdown
            className={styles.dropdown}
            key="filter1"
            label="Filter by sector"
            options={[{ value: 1, label: 'Sector 1' }, { value: 2, label: 'Sector 2' }, { value: 3, label: 'Sector 3' }]}
            onValueChange={this.handleSourceChange}
            value={{ value: 1, label: 'Sector 1' }}
            disclaimer={'3 National Policies available for Germany'}
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
              title="Submitted NDC"
            >
              <CardRow
                title="Targets type"
                description="Baseline year scenario"
              />
              <CardRow
                title="Targets"
                subtitle="Economy-wide targets"
                description="40% cut in GHG emissions in 2030, from 1990 levels"
              />
            </Card>
          ) : (
            <div className={cx(styles.fixedCard, styles.noContent)}>
              No Renewable Energy targets found in the NDC
            </div>
          )}
          {cards && cards.length > 0 ? (
            <SlideCards cards={cards} cardsInRow={cardsInRow} />
          ) : (
            <div className={styles.noContent}>
              There are no targets found in law and policies
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
  cards: PropTypes.array.isRequired,
  cardsInRow: PropTypes.number
};

export default LawsAndPolicies;
