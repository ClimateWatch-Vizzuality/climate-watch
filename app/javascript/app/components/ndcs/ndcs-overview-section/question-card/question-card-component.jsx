import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'components/progress';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import externalLinkIcon from 'assets/icons/external-link.svg';
import ReactTooltip from 'react-tooltip';
import Loading from 'components/loading';
import styles from './question-card.scss';

const QuestionCard = ({
  metadataSlug,
  link,
  questionText,
  questionStats,
  hasExternalLink,
  color,
  handleInfoClick
}) => {
  const { answerNumber, maxPartiesNumber, emissionPercentage } =
    questionStats || {};
  return (
    <div className={styles.questionCard}>
      <button
        title="Information"
        className={styles.infoButton}
        data-for="info-button"
        data-tip="Information"
        onClick={() => handleInfoClick(metadataSlug)}
      >
        <Icon icon={infoIcon} />
        <ReactTooltip id="info-button" effect="solid" />
      </button>
      <a
        className={styles.questionCardLink}
        href={link}
        target="_blank"
        title={questionText}
      >
        <div className={styles.questionText}>
          {questionText}
          {hasExternalLink && (
            <Icon className={styles.externalLinkIcon} icon={externalLinkIcon} />
          )}
        </div>
        {answerNumber || answerNumber === 0 ? (
          <React.Fragment>
            <div className={styles.answerText}>
              <span className={styles.answerNumber}>{answerNumber}</span> out of{' '}
              {maxPartiesNumber} covering{' '}
              <span className={styles.percentage}>
                {emissionPercentage || emissionPercentage === 0
                  ? Math.round(emissionPercentage * 10) / 10
                  : '-'}{' '}
                %
              </span>{' '}
              of total GHG emissions
            </div>
            <Progress
              value={(answerNumber / maxPartiesNumber) * 100}
              className={styles.progressBar}
              color={color}
            />
          </React.Fragment>
        ) : (
          <Loading light mini className={styles.loader} />
        )}
      </a>
    </div>
  );
};

QuestionCard.propTypes = {
  questionText: PropTypes.string,
  link: PropTypes.string,
  hasExternalLink: PropTypes.bool,
  metadataSlug: PropTypes.string,
  handleInfoClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  questionStats: PropTypes.object
};

export default QuestionCard;
