import React from 'react';
import renderHTML from 'html-react-parser';
import PropTypes from 'prop-types';
import Table from 'components/table';
import { NavLink } from 'react-router-dom';

import SideNavigation from 'components/side-navigation';

import styles from './about-faq-styles.scss';

const renderQuestion = ({ title, answer, type, tableData = null }, index) => (
  <div key={title} className={styles.questionContainer}>
    <div className={styles.questionTitleWrapper}>
      <span className={styles.questionTitle}>{`${index + 1}. `}</span>
      <span className={styles.questionTitle}>{title}</span>
    </div>
    {renderAnswer(type, answer, tableData)}
  </div>
);

const replaceNavLink = ({ attribs }) => (
  <NavLink to={attribs.to}>
    <span>{attribs.innertext}</span>
  </NavLink>
);

const replaceTable = tableData => <Table data={tableData} horizontalScroll />;

const renderAnswer = (type, answer, tableData) => {
  switch (type) {
    case 'html':
      return (
        <div className={styles.htmlAnswer}>
          {renderHTML(answer, {
            replace: node => node.name === 'link' && replaceNavLink(node)
          })}
        </div>
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
      return <p className={styles.questionAnswer}>{answer}</p>;
  }
};

const FaqComponent = ({
  sections,
  sideNavigationSections,
  selectedSectionSlug
}) => (
  <div className={styles.container}>
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
  selectedSectionSlug: PropTypes.string
};

export default FaqComponent;
