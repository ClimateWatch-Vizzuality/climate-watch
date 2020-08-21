import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'pages/ndcs/ndcs-actions';
import { actions as modalActions } from 'components/modal-metadata';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Component from './ndcs-overview-section-component';
import { commitmentsData } from './ndcs-overview-section-data';

const NdcsOverviewSection = props => {
  useEffect(() => {
    const { fetchNDCS } = props;
    const indicatorSlugs = [];
    commitmentsData.forEach(d => {
      d.questions.forEach(q => {
        if (q.slug && !indicatorSlugs.includes(q.slug)) {
          indicatorSlugs.push(q.slug);
        }
      });
    });
    fetchNDCS({
      overrideFilter: true,
      indicatorSlugs,
      additionalIndicatorSlugs: ['ndce_ghg']
    });
  }, []);

  const handleInfoClick = source => {
    if (source) {
      props.setModalMetadata({
        category: 'NDC Overview',
        slugs: source,
        open: true
      });
    }
  };

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
        handleInfoClick={handleInfoClick}
      />
    ));
  }
  return (
    <Component
      data={commitmentsData[section - 1]}
      section={section}
      location={location}
      handleInfoClick={handleInfoClick}
    />
  );
};

NdcsOverviewSection.propTypes = {
  section: PropTypes.number,
  location: PropTypes.object,
  match: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired
};
export default withRouter(
  connect(null, { ...actions, ...modalActions })(NdcsOverviewSection)
);
