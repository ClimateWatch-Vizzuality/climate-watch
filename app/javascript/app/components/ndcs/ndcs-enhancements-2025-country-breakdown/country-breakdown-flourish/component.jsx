import React from 'react';

import styles from './styles';

const CountryBreakdownFlourishComponent = () => {
  return (
    <div className={styles.flourishEmbedWrapper}>
      <div className="flourish-embed">
        <iframe
          scrolling="no"
          frameBorder="0"
          title="Interactive or visual content"
          sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          src="https://flo.uri.sh/story/2873465/embed?auto=1"
        />
      </div>
    </div>
  );
};

export default CountryBreakdownFlourishComponent;
