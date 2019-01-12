import React from 'react';

import SideNavigation from 'components/side-navigation';

import styles from './about-faq-styles.scss';

const renderTextFaq = (q, index) => (
  <div key={q.title} className={styles.questionContainer}>
    <div className={styles.questionTitleWrapper}>
      <span className={styles.questionTitle}>
        {`${index + 1}. `}
      </span>
      <span className={styles.questionTitle}>
        {q.title}
      </span>
    </div>
    <p className={styles.questionAnswer}>{q.answer}</p>
  </div>
);

const renderTableFaq = () => (
  <div>table here</div>
);

const FaqComponent = ({ selectedSection, sideNavigationSections, selectedSectionSlug }) => (
  <div className={styles.container}>
    <SideNavigation sections={sideNavigationSections} selectedSection={selectedSectionSlug} />
    <div className={styles.faqContentContainer}>
      {
        selectedSection.content.map((q, index) => (
          q.type === 'text' ?
            renderTextFaq(q, index) :
            renderTableFaq()
        )
        )
      }
    </div>
  </div>
);

export default FaqComponent;
