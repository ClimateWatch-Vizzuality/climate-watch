import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import cx from 'classnames';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import AnchorNav from 'components/anchor-nav';

import NDCMap from 'components/ndcs-map';
import NDCTable from 'components/ndcs-table';

import layout from 'styles/layout.scss';
import styles from './ndcs-styles.scss';

const NDC = props =>
  (<div>
    <Header size="medium">
      <Intro title="NDC Explorer" />
      <AutocompleteSearch />
      <AnchorNav links={props.links} />
    </Header>
    <div className={cx(layout.content, styles.wrapper)}>
      <Switch>
        <Route path={props.match.url} exact>
          <NDCMap />
        </Route>
        <Route path={`${props.match.url}/table`} exact>
          <NDCTable />
        </Route>
        <Redirect to={props.match.url} />
      </Switch>
    </div>
  </div>);

NDC.propTypes = {
  match: Proptypes.object.isRequired,
  links: Proptypes.array.isRequired
};

export default NDC;
