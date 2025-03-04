import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import TooltipComponent from '../components/tooltip/component';

const TooltipsComponent = ({ data, settings, view }) => {
  if (!data) return null;

  const tooltipValues = useMemo(() => {
    const type = settings?.conditionalNDC?.value;

    if (view === 'baseline') {
      const baseline = settings?.baselineYear?.value;
      const targets = [2030, 2035];

      return data?.baseline?.data
        ?.map(entry =>
          targets?.map(year => ({
            id: `country-emissions-${entry?.iso}-${year}-tooltip`,
            label: `${year} ${type.charAt(0).toUpperCase() +
              type.slice(
                1
              )} NDC Target Compared to ${baseline} Historical Emissions`,
            color: year === 2030 ? '#8F8F9F' : '#0845CB',
            value: `${Math.round(entry?.[type]?.[year])}%`,
            country: entry?.name
          }))
        )
        ?.flat();
    }

    return data?.target?.data
      ?.map(entry => ({
        id: `country-emissions-${entry?.iso}-tooltip`,
        label: `${type.charAt(0).toUpperCase() +
          type.slice(1)} NDC Target Compared to 2030 Target`,
        color: '#0845CB',
        value: `${Math.round(entry?.[type])} MtCO2e`,
        country: entry?.name
      }))
      ?.flat();
  }, [data, settings, view]);

  if (!tooltipValues) return null;

  return (
    <>
      {tooltipValues?.map(({ id, label, color, value, country }) => (
        <TooltipComponent
          key={id}
          id={id}
          label={label}
          color={color}
          value={value}
          country={country}
        />
      ))}
    </>
  );
};

TooltipsComponent.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
  view: PropTypes.oneOf(['baseline', 'target'])
};

export default TooltipsComponent;
