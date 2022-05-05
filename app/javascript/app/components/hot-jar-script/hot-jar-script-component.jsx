import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const HotJarScript = props => {
  const { countryIso } = props;

  const trackedCountryPagesIsos = ['USA', 'CHN', 'BRA', 'EGY', 'IND', 'CAN'];
  if (countryIso && !trackedCountryPagesIsos.includes(countryIso)) {
    return null;
  }

  return (
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML: `function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:2890397,hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
        }
      ]}
    />
  );
};

HotJarScript.propTypes = {
  countryIso: PropTypes.string
};

export default HotJarScript;
