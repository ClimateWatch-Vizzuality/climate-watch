import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'components/tag';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import Logo from './logo-component';

import styles from './legend-styles';

const hasLogo = data => data && data.logo;
const LegendComponent = ({ className, data = [], theme }) => (
  <div className={cx(className, theme.legend)}>
    <ul className={theme.tags}>
      {data &&
        data.theme.map(l => (
          <Tag
            key={l.label}
            className={theme.tagItem}
            label={l.label}
            color={l.color}
          />
        ))}
    </ul>
    {hasLogo && <Logo data={data} />}
  </div>
);

LegendComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  theme: PropTypes.object
};

export default themr('LegendComponent', styles)(LegendComponent);
