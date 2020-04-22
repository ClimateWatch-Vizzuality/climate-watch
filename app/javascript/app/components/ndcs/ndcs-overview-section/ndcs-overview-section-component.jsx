import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isEmbededComponent } from 'utils/navigation';
import layout from 'styles/layout.scss';
import ShareButton from 'components/button/share-button';
import ModalShare from 'components/modal-share';
import styles from './ndcs-overview-section-styles.scss';
import QuestionCard from './question-card';

const NdcsOverviewSection = ({ data, section, location, handleInfoClick }) => {
  const { title, description, hint, questions, color } = data;
  const isEmbed = isEmbededComponent(location);
  return (
    <div
      className={cx({
        [styles.commitmentContainer]: !isEmbed
      })}
    >
      <div className={layout.content}>
        <div className={cx(styles.section, { [styles.padded]: !isEmbed })}>
          <div className={styles.commitmentWrapper}>
            <div className={styles.commitmentText}>
              <div>
                <h1 className={styles.title}>{`${
                  isEmbed ? '' : `${section}. `
                }${title}`}</h1>
                <p
                  className={cx(styles.description, {
                    [styles.firstDescription]: parseInt(section, 10) === 1
                  })}
                >
                  {description}
                </p>
              </div>
              <p className={styles.hint}>{hint}</p>
            </div>
            <div className={styles.barCharts} />
          </div>
          <div className={styles.questionsWrapper}>
            <ShareButton
              className={styles.shareButton}
              sharePath={`/ndc-overview/${section}`}
            />
            <ModalShare analyticsName="NDC Overview" />
            {questions.map(question => (
              <QuestionCard
                key={`${question.slug}${question.questionText}`}
                slug={question.slug}
                metadataSlug={question.metadataSlug}
                link={question.link}
                color={color}
                questionText={question.questionText}
                answerLabel={question.answerLabel}
                handleInfoClick={handleInfoClick}
                hasExternalLink={question.hasExternalLink}
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
  handleInfoClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    hint: PropTypes.string,
    questions: PropTypes.array
  })
};

export default NdcsOverviewSection;
