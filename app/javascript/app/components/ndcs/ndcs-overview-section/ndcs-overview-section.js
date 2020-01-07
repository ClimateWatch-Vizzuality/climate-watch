import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import actions from 'pages/ndcs/ndcs-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Component from './ndcs-overview-section-component';
import { commitmentsData } from './ndcs-overview-section-data';

class NdcsOverviewSection extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCS(true);
  }

  render() {
    const { match, location } = this.props;
    let { section } = this.props;
    section = section || match.params.section;
    if (!section) {
      return commitmentsData.map((commitmentData, index) => (
        <Component
          data={commitmentData}
          key={commitmentData.title}
          section={index + 1}
          location={location}
        />
      ));
    }
    return (
      <Component
        data={commitmentsData[section - 1]}
        section={section}
        location={location}
      />
    );
  }
}

NdcsOverviewSection.propTypes = {
  fetchNDCS: PropTypes.func.isRequired,
  section: PropTypes.number,
  location: PropTypes.object,
  match: PropTypes.object
};
export default withRouter(connect(null, actions)(NdcsOverviewSection));
