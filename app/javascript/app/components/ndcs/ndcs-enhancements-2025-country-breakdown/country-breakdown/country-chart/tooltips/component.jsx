import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import TooltipComponent from '../components/tooltip/component';

const TooltipsComponent = ({ data, settings }) => {
  if (!data) return null;

  const tooltipValues = useMemo(() => {
    const baseline = settings?.baselineYear?.value;
    const type = settings?.conditionalNDC?.value;
    const targets = [2030, 2035];

    return data
      ?.map((entry) =>
        targets?.map((year) => ({
          id: `country-emissions-${entry?.iso}-${year}-${type}-${baseline}-tooltip`,
          label: `${year} ${type.charAt(0).toUpperCase() +
            type.slice(
              1
            )} NDC Target Compared to ${baseline} Historical Emissions`,
          color: '#0845CB',
          value: `${Math.round(entry?.[type]?.[year])}%`,
          country: entry?.name
        }))
      )
      ?.flat();
  }, [data, settings]);

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
  settings: PropTypes.object
};

export default TooltipsComponent;
