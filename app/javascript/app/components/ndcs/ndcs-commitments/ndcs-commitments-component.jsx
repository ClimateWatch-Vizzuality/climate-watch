import React from 'react';
import PropTypes from 'prop-types';
import layout from 'styles/layout.scss';
import ShareButton from 'components/button/share-button';
import styles from './ndcs-commitments-styles.scss';
import QuestionCard from './question-card';

const Commitment = props => {
  const { title, description, hint, questions, color } = props;
  return (
    <div className={styles.commitmentContainer}>
      <div className={layout.content}>
        <div className={styles.section}>
          <div className={styles.commitmentWrapper}>
            <div className={styles.commitmentText}>
              <div>
                <h1 className={styles.title}>{title}</h1>
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
              sharePath="/embed/ndc-overview"
            />
            {questions.map(question => (
              <QuestionCard
                key={question.slug || question.questionText}
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

const NdcsCommitments = ({ data }) =>
  data.map(commitment => <Commitment key={commitment.title} {...commitment} />);

Commitment.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  hint: PropTypes.string,
  questions: PropTypes.array
};

NdcsCommitments.propTypes = {
  data: PropTypes.array
};

export default NdcsCommitments;
