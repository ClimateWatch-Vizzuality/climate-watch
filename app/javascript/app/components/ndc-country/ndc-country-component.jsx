import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Header from 'components/header';
import Intro from 'components/intro';
import Accordion from 'components/accordion';
import Button from 'components/button';
import qs from 'query-string';

class NDCCountry extends Component {
  handleCompareClick = () => {
    const { location, history } = this.props;
    const search = qs.parse(location.search);
    const newSearch = { ...search, compare: search.compare === '1' ? 0 : 1 };
    history.push({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  render() {
    return (
      <div>
        <Header>
          <Intro title="Country name" />
          <Button className="compare-button" onClick={this.handleCompareClick}>
            <span>Compare</span>
          </Button>
        </Header>
        <Accordion />
      </div>
    );
  }
}

NDCCountry.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(NDCCountry);
