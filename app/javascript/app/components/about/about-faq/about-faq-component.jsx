import React from 'react';
import renderHTML from 'html-react-parser';
import { NavLink } from 'react-router-dom';

import SideNavigation from 'components/side-navigation';

import styles from './about-faq-styles.scss';

const renderQuestion = ({ title, answer, type }, index) => (
  <div key={title} className={styles.questionContainer}>
    <div className={styles.questionTitleWrapper}>
      <span className={styles.questionTitle}>
        {`${index + 1}. `}
      </span>
      <span className={styles.questionTitle}>
        {title}
      </span>
    </div>
    {renderAnswer(type, answer)}
  </div>
);

const replaceNavLink = ({ attribs }) => <NavLink to={attribs.to}><span>{attribs.innertext}</span></NavLink>;

const renderAnswer = (type, answer) => {
  switch (type) {
    case 'html':
      return (<div className={styles.htmlAnswer} >
        {renderHTML(answer, { replace: node => node.name === 'link' && replaceNavLink(node) })}
      </div>);
    default:
      return <p className={styles.questionAnswer}>{answer}</p>;
  }
};

const FaqComponent = ({ sections, sideNavigationSections, selectedSectionSlug }) =>(
  <div className={styles.container}>
    <SideNavigation sections={sideNavigationSections} selectedSection={selectedSectionSlug} />
    <div className={styles.faqContentContainer}>
      {
        sections.filter(s => s.slug === selectedSectionSlug)[0].content.map((q, index) => (
          renderQuestion(q, index)
        ))
      }
    </div>
  </div>
);

export default FaqComponent;
