import React, { Component } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

import Card from 'components/card';
import CardRow from 'components/card/card-row';
import Icon from 'components/icon';

import rightArrow from 'assets/icons/right-arrow.svg';
import backArrow from 'assets/icons/left-arrow.svg';

import cx from 'classnames';
import cardTheme from 'styles/themes/card/card-overflow-content.scss';
import styles from './slide-cards-styles.scss';

class SlideCards extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 0, currentDot: 0 };
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
      <div className={styles.wrapper}>
        <div className={styles.cardsContainer}>
          {currentCardsInDisplay &&
            currentCardsInDisplay.map(card => (
              <li key={card.source.title} className={styles.card}>
                <Card
                  keyValue={card.source.title}
                  contentFirst
                  title={{
                    link: card.source.link,
                    title: card.source.title
                      ? `Targets found in ${card.source.title}`
                      : 'Targets'
                  }}
                  theme={{ card: styles.cardInside, ...cardTheme }}
                >
                  {Object.keys(card.content).map((targetType, i) => [
                    <CardRow
                      keyValue={`${i}-${targetType}`}
                      rowData={{ title: 'Targets Type', value: targetType }}
                    />,
                    card.content[targetType].map((target, ind) => (
                      <CardRow
                        keyValue={`${ind}-target.description`}
                        rowData={{
                          title: 'Targets',
                          subtitle: upperFirst(target.scope),
                          value: target.description
                        }}
                      />
                    ))
                  ])}
                </Card>
              </li>
            ))}
          {currentCardsInDisplay.length === 1 && (
            <div className={styles.noContent} />
          )}
          {cards[currentIndex + cardsInRow] && (
            <button
              className={cx(styles.arrowNavCircle, styles.arrowNavRight)}
              onClick={this.handleRightSlide}
            >
              <Icon icon={rightArrow} className={styles.arrow} />
            </button>
          )}
          {cards[currentIndex - cardsInRow] && (
            <button
              className={cx(styles.arrowNavCircle, styles.arrowNavLeft)}
              onClick={this.handleBackSlide}
            >
              <Icon icon={backArrow} className={styles.arrow} />
            </button>
          )}
        </div>
        {cards.length > cardsInRow && (
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
