import React from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ link, slug, answerLabel, questionStats }) => {
  const { answerNumber } = questionStats || {};
  return (
    <div>
      {link}
      {slug}
      {answerLabel}
      {answerNumber}
    </div>
  );
};

QuestionCard.propTypes = {
  link: PropTypes.string,
  slug: PropTypes.string,
  answerLabel: PropTypes.string,
  questionStats: PropTypes.object
};

export default QuestionCard;
