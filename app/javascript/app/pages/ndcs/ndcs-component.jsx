import React, { PureComponent } from 'react';
import { renderRoutes } from 'react-router-config';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

class NDC extends PureComponent {
  render() {
    return (
      <div>
        <Header size="medium">
          <div className={styles.cols}>
            <Intro title="NDC Explorer" />
            <AutocompleteSearch />
          </div>
          <AnchorNav links={this.props.links} />
        </Header>
        <div className={cx(layout.content, styles.wrapper)}>
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    );
  }
}

NDC.propTypes = {
  route: Proptypes.object.isRequired,
  links: Proptypes.array.isRequired
};

export default NDC;
