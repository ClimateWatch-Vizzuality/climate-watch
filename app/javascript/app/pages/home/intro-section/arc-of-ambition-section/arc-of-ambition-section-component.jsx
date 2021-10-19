import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'cw-components';
import Button from 'components/button';
import AbbrReplace from 'components/abbr-replace';
import { slidesData } from './arc-of-ambition-section-data';

import styles from './arc-of-ambition-section-styles.scss';

const renderButton = b => (
  <Button
    className={styles.button}
    key={b.text}
    link={b.link}
    variant={b.variant}
  >
    {b.text}
  </Button>
);

const TopSlide = ({ smImage, bgImage, altText }) => (
  <div className={styles.bottomSlideContainer} key={altText}>
    <img
      className={styles.image}
      src={smImage}
      srcSet={`${smImage}, ${bgImage} 2x`}
      alt={altText}
    />
  </div>
);

const BottomSlide = ({ title, text, buttons }) => (
  <div className={styles.slideWrapper} key={title}>
    <h3 className={styles.slideTitle}>{title}</h3>
    {text.map(paragraph => (
      <p key={paragraph} className={styles.slideParagraph}>
        <AbbrReplace>{paragraph}</AbbrReplace>
      </p>
    ))}
    <div className={styles.buttonsContainer}>
      {buttons.map(b => renderButton(b))}
    </div>
  </div>
);

class ArcOfAmbitionSectionComponent extends Component {
  pagingTitles = () =>
    slidesData.map(s => <AbbrReplace>{s.pagingTitle}</AbbrReplace>);

  renderSlides = ({ countriesOptions }) => {
    const tops =
      slidesData &&
      slidesData.map(slide => (
        <TopSlide
          key={slide.smImage}
          smImage={slide.smImage}
          bgImage={slide.bgImage}
          altText={slide.altText}
          topSlide
        />
      ));

    const bottoms =
      slidesData &&
      slidesData.map(slide => (
        <BottomSlide
          key={slide.title}
          title={slide.title}
          text={slide.text}
          buttons={slide.buttons}
          countriesOptions={countriesOptions}
          bottomSlide
        />
      ));

    return [...tops, ...bottoms];
  };

  render() {
    return (
      <section className={styles.arcOfAmbition}>
        <Carousel
          pagingTitles={this.pagingTitles(slidesData)}
          primarySlider="bottom"
          autoplay
          theme={{ pagingTitle: styles.pagingTitle }}
          config={{ secondarySlider: { fade: true } }}
        >
          {this.renderSlides(this.props)}
        </Carousel>
      </section>
    );
  }
}

BottomSlide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.string),
  buttons: PropTypes.arrayOf(PropTypes.shape({}))
};

BottomSlide.defaultProps = {
  title: null,
  text: null,
  buttons: null
};

TopSlide.propTypes = {
  smImage: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};

export default ArcOfAmbitionSectionComponent;
