import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card';
import Icon from 'components/icon';

import rightArrow from 'assets/icons/right-arrow.svg';
import backArrow from 'assets/icons/left-arrow.svg';

import cx from 'classnames';
import styles from './slide-cards-styles.scss';

class SlideCards extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: props.cards && 0, currentDot: 0 };
  }

  handleRightSlide = () => {
    const { cardsInRow } = this.props;
    this.setState({
      currentIndex: this.state.currentIndex + cardsInRow,
      currentDot: this.state.currentDot + 1
    });
  };

  handleBackSlide = () => {
    const { cardsInRow } = this.props;
    this.setState({
      currentIndex: this.state.currentIndex - cardsInRow,
      currentDot: this.state.currentDot - 1
    });
  };

  handleDotPagination = index => {
    const { cardsInRow } = this.props;
    this.setState({
      currentDot: index,
      currentIndex: index * cardsInRow
    });
  };

  render() {
    const { currentIndex, currentDot } = this.state;
    const { cards, cardsInRow } = this.props;

    const currentCardsInDisplay = cards.slice(
      currentIndex,
      currentIndex + cardsInRow
    );
    const dots = Array.from(Array(Math.ceil(cards.length / cardsInRow)).keys());

    return (
      <div className={styles.cardsContainer}>
        {currentCardsInDisplay &&
          currentCardsInDisplay.map(card => (
            <li key={card.name} className={styles.card}>
              <Card title={card.title} subtitle={card.description} />
            </li>
          ))}
        {cards[currentIndex + cardsInRow] && (
          <button
            className={styles.arrowNavCircle}
            onClick={this.handleRightSlide}
          >
            <Icon icon={rightArrow} className={styles.arrow} />
          </button>
        )}
        {cards[currentIndex - cardsInRow] && (
          <button
            className={styles.arrowNavCircle}
            onClick={this.handleBackSlide}
          >
            <Icon icon={backArrow} className={styles.arrow} />
          </button>
        )}
        {cards.length > 0 && (
          <div className={styles.dotsPagination}>
            {dots &&
              dots.map((el, index) => (
                <button
                  key={el}
                  className={cx(styles.dot, {
                    [styles.filledDot]: index === currentDot
                  })}
                  onClick={() => this.handleDotPagination(index)}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

SlideCards.propTypes = {
  cards: PropTypes.array,
  cardsInRow: PropTypes.number
};

SlideCards.defaultProps = {
  cards: null,
  cardsInRow: 2
};

export default SlideCards;
