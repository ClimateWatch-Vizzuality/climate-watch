import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'pages/ndcs/ndcs-actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Component from './ndcs-overview-section-component';
import { commitmentsData } from './ndcs-overview-section-data';

const NdcsOverviewSection = props => {
  useEffect(() => {
    const { fetchNDCS } = props;
    fetchNDCS(true);
  }, []);

  const { match, location } = props;
  let { section } = props;
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
};

NdcsOverviewSection.propTypes = {
  section: PropTypes.number,
  location: PropTypes.object,
  match: PropTypes.object
};
export default withRouter(connect(null, actions)(NdcsOverviewSection));
