import React from 'react';
import renderHTML from 'html-react-parser';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SimpleTable from 'components/simple-table';
import SideNavigation from 'components/side-navigation';
import AbbrReplace from 'components/abbr-replace';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import styles from './about-faq-styles.scss';

const renderQuestion = ({ title, answer, type, tableData = null }, index) => (
  <div key={title} className={styles.questionContainer}>
    <div className={styles.questionTitleWrapper}>
      <span className={styles.questionTitle}>{`${index + 1}. `}</span>
      <span className={styles.questionTitle}>
        <AbbrReplace>{title}</AbbrReplace>
      </span>
    </div>
    <AbbrReplace>{renderAnswer(type, answer, tableData)}</AbbrReplace>
  </div>
);

const replaceNavLink = ({ attribs }) => (
  <NavLink to={attribs.to}>
    <span>{attribs.innertext}</span>
  </NavLink>
);

const replaceTable = tableData => <SimpleTable data={tableData} />;

const renderAnswer = (type, answer, tableData) => {
  switch (type) {
    case 'html':
      return (
        <AbbrReplace>
          <div className={styles.htmlAnswer}>
            {renderHTML(answer, {
              replace: node => node.name === 'link' && replaceNavLink(node)
            })}
          </div>
        </AbbrReplace>
      );
    case 'table':
      return (
        <div className={styles.htmlAnswer}>
          {renderHTML(answer, {
            replace: node => node.name === 'table' && replaceTable(tableData)
          })}
        </div>
      );
    default:
      return (
        <p className={styles.questionAnswer}>
          <AbbrReplace>{answer}</AbbrReplace>
        </p>
      );
  }
};

const FaqComponent = ({
  sections,
  sideNavigationSections,
  selectedSectionSlug,
  location
}) => (
  <div className={styles.container}>
    <SEOTags page={SEO_PAGES.aboutFAQ} href={location.href} />
    <SideNavigation
      sections={sideNavigationSections}
      selectedSection={selectedSectionSlug}
    />
    <div className={styles.faqContentContainer}>
      {sections
        .find(s => s.slug === selectedSectionSlug)
        .content.map((q, index) => renderQuestion(q, index))}
    </div>
  </div>
);

renderQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.shape({}))
};

replaceNavLink.propTypes = {
  attribs: PropTypes.shape({})
};

FaqComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({})),
  sideNavigationSections: PropTypes.arrayOf(PropTypes.shape({})),
  selectedSectionSlug: PropTypes.string,
  location: PropTypes.object
};

export default FaqComponent;
