import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SDGCard from 'components/sdg-card';

import cardTheme from 'styles/themes/sdg-card/sdg-card';
import styles from './ndc-sdg-linkages-table-styles.scss';

class NdcSdgLinkagesTable extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { sdgs, selectSDG, selectedSDG } = this.props;
    if (!sdgs || !sdgs.length) return <div className={styles.placeholder} />;
    return (
      <div className={styles.container}>
        {selectedSDG ? null : ( // <- Goals List component
          sdgs.map(sdg => (
            <SDGCard
              square
              hover
              onClick={() => selectSDG(sdg.number)}
              key={sdg.title}
              sdgData={sdg}
              tooltipId="sdg-linkages"
              className={cx(cardTheme.card, cardTheme.squaredCard)}
            />
          ))
        )}
      </div>
    );
  }
}

NdcSdgLinkagesTable.propTypes = {
  sdgs: PropTypes.array,
  selectSDG: PropTypes.func.isRequired,
  selectedSDG: PropTypes.string
};

export default NdcSdgLinkagesTable;
