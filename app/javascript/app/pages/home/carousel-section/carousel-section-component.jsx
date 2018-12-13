import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'cw-components';
import Dropdown from 'components/dropdown';
import Button from 'components/button';
import { handleAnalytics } from 'utils/analytics';
import { slidesData } from './carousel-section-data';

import styles from './carousel-section-styles.scss';

const BottomSlide = ({ title, text, buttons, countriesOptions, handleDropDownChange }) => (
  <div className={styles.slideWrapper} key={title}>
    <h3 className={styles.slideTitle}>{title}</h3>
    {text.map(paragraph => (
      <p key={paragraph} className={styles.slideParagraph}>
        {paragraph}
      </p>
    ))}
    <div className={styles.buttonsContainer}>
      {
        buttons.map(b => (b.link ?
          (<Button className={styles.button} key={b.text} link={b.link} color={b.color}>{b.text}</Button>) :
          (
            <div key={b.text} className={styles.button}>
              <Dropdown
                placeholder="Select another country"
                options={countriesOptions}
                onValueChange={handleDropDownChange}
                plain
                hideResetButton
              />
            </div>
          )
        )
      )}
    </div>
  </div>
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

class CarouselSectionComponent extends Component {
  pagingTitles = () => slidesData.map(s => s.pagingTitle);

  handleDropDownChange = selected => {
    const { history } = this.props;
    history.push(`/countries/${selected.value}`);
    handleAnalytics('Home', 'Search for a country', selected.value);
  };

  // renderExploreCountryButton = () => (
  //   <div>
  //     <span
  //       className={cx(styles.geoLocation, {
  //         [styles.geoLocationHide]: !geolocation.country
  //       })}
  //     >
  //       Connected from {geolocation.country}?
  //     </span>
  //     <div className={cx(styles.doubleFold, styles.mobileDoubleAction)}>
  //       <Button
  //         color="yellow"
  //         link={`/countries/${geolocation.iso ? geolocation.iso : ''}`}
  //       >
  //         Explore your country
  //       </Button>
        
  //     </div>
  //   </div>
  // )

  renderSlides = ({ geolocation, countriesOptions }) => {
    const tops = slidesData &&
      slidesData.map(slide => (
        <TopSlide
          key={slide.smImage}
          smImage={slide.smImage}
          bgImage={slide.bgImage}
          altText={slide.altText}
          topSlide
        />
      ));

    const bottoms = slidesData &&
      slidesData.map(slide => (
        <BottomSlide
          key={slide.title}
          title={slide.title}
          text={slide.text}
          buttons={slide.buttons}
          geolocation={geolocation}
          countriesOptions={countriesOptions}
          handleDropDownChange={this.handleDropDownChange}
          bottomSlide
        />
      ));

    return [...tops, ...bottoms];
  };

  render() {
    return (
      <section className={styles.container}>
        <Carousel pagingTitles={this.pagingTitles(slidesData)} primarySlider="bottom" autoplay={false}>
          {this.renderSlides(this.props)}
        </Carousel>
      </section>
    );
  }
}

BottomSlide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.string),
  buttons: PropTypes.arrayOf(PropTypes.shape({})),
  countriesOptions: PropTypes.arrayOf(PropTypes.shape({})),
  handleDropDownChange: PropTypes.func.isRequired
};

BottomSlide.defaultProps = {
  title: null,
  text: null,
  buttons: null,
  countriesOptions: []
};

TopSlide.propTypes = {
  smImage: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};

export default CarouselSectionComponent;
