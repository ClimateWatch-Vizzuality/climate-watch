import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmbededComponent } from 'utils/navigation';
import layout from 'styles/layout.scss';
import ShareButton from 'components/button/share-button';
import styles from './ndcs-overview-section-styles.scss';
import QuestionCard from './question-card';

const NdcsOverviewSection = ({ data, section, location }) => {
  const { title, description, hint, questions, color } = data;
  const isEmbed = isEmbededComponent(location);

  return (
    <div
      className={cx({
        [styles.commitmentContainer]: !isEmbed
      })}
    >
      <div className={layout.content}>
        <div className={styles.section}>
          <div className={styles.commitmentWrapper}>
            <div className={styles.commitmentText}>
              <div>
                <h1 className={styles.title}>{`${
                  isEmbed ? '' : `${section}. `
                }${title}`}</h1>
                <p className={styles.description}>{description}</p>
              </div>
              <p className={styles.hint}>{hint}</p>
            </div>
            <div className={styles.barCharts} />
          </div>
          <div className={styles.questionsWrapper}>
            <ShareButton
              className={styles.shareButton}
              analyticsName="NDC Overview"
              sharePath={`/embed/ndc-overview/${section}`}
            />
            {questions.map(question => (
              <QuestionCard
                key={`${question.slug}${question.questionText}`}
                slug={question.slug}
                link={question.link}
                color={color}
                linkSlug={question.linkSlug}
                questionText={question.questionText}
                answerLabel={question.answerLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

NdcsOverviewSection.propTypes = {
  section: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  location: PropTypes.object,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    hint: PropTypes.string,
    questions: PropTypes.array
  })
};

export default NdcsOverviewSection;
