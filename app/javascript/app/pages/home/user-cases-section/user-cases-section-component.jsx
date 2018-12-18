import React, { Component } from 'react';
import Slider from 'react-slick';
import { Icon } from 'cw-components';
// Assets
import userIcon from 'assets/icons/user.svg';
import politicianImg from 'assets/home/government@2x.jpg';
import researcherImg from 'assets/home/researcher@2x.png';
import activistImg from 'assets/home/activist@2x.png';

import styles from './user-cases-section-styles.scss';

const pagingTitles = ['Government official', 'Researcher', 'Journalist'];

const settings = {
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  fade: true,
  dotsClass: 'userCasesPaging',
  customPaging: i => (
    <div>
      <Icon icon={userIcon} theme={{ icon: styles.userIcon }} />
      <p>{pagingTitles[i]}</p>
    </div>
  )
};

const anchorsProps = {
  rel: 'noopener norefer',
  className: styles.link,
  target: '_blank'
};

class UserCasesSectionComponent extends Component {
  render() {
    return (
      <section className={styles.container}>
        <div className={styles.sliderWrapper}>
          <Slider
            ref={slider => {
              this.leftSlider = slider;
            }}
            slidesToShow={1}
            autoplay={false}
            beforeChange={(current, next) => this.rightSlider.slickGoTo(next)}
            fade
          >
            <div>
              <img src={politicianImg} alt="Political building" />
            </div>
            <div>
              <img src={researcherImg} alt="Library" />
            </div>
            <div>
              <img src={activistImg} alt="Demonstration" />
            </div>
          </Slider>
          <Slider
            ref={slider => {
              this.rightSlider = slider;
            }}
            beforeChange={(current, next) => this.leftSlider.slickGoTo(next)}
            {...settings}
          >
            <div className={styles.slideWrapper}>
              <h3 className={styles.slideTitle}>
                How can Climate Watch help you?
              </h3>
              <ol className={styles.slideList}>
                <li>
                  View your country and other countries climate plans in{' '}
                  <a {...anchorsProps} href="/ndcs-content">
                    NDC Content
                  </a>
                </li>
                <li>
                  Compare your countries’ emission by sector and gas with other
                  countries over time in{' '}
                  <a {...anchorsProps} href="/ghg-emissions">
                    GHG emissions
                  </a>
                </li>
                <li>
                  Understand implications of different economic and emission
                  scenarios for your country to plan ahead with{' '}
                  <a {...anchorsProps} href="/pathways">
                    Pathways
                  </a>
                </li>
                <li>
                  Learn about existing linkages between countries’ climate plans
                  and the Sustainable Development Goals with{' '}
                  <a {...anchorsProps} href="/ndcs-sdg">
                    NDC-SDG Linkages
                  </a>
                </li>
              </ol>
            </div>
            <div className={styles.slideWrapper}>
              <h3 className={styles.slideTitle}>
                How can Climate Watch help you?
              </h3>
              <ol className={styles.slideList}>
                <li>
                  Explore NDC content, compare across countries and download
                  data with the{' '}
                  <a {...anchorsProps} href="/ndcs-content">
                    NDC Content
                  </a>.
                </li>
                <li>
                  View and download comprehensive historical GHG emissions from
                  multiple data sources in{' '}
                  <a {...anchorsProps} href="/ghg-emissions">
                    GHG emissions
                  </a>
                </li>
                <li>
                  Compare countries’ different economic and emission scenarios
                  from multiple climate models in{' '}
                  <a {...anchorsProps} href="/pathways">
                    Pathways
                  </a>
                </li>
                <li>
                  Build your own visualization using climate and economic
                  modeling data with{' '}
                  <a {...anchorsProps} href="/my-climate-watch">
                    MyClimateWatch
                  </a>
                </li>
              </ol>
            </div>
            <div className={styles.slideWrapper}>
              <h3 className={styles.slideTitle}>
                How can Climate Watch help you?
              </h3>
              <ol className={styles.slideList}>
                <li>
                  Search for a keyword across the text of all NDCs using the{' '}
                  <a {...anchorsProps} href="/ndc-search">
                    NDC search
                  </a>.
                </li>
                <li>
                  Compare indicators for two or three countries side by side
                  with the{' '}
                  <a {...anchorsProps} href="/countries/compare">
                    Country comparison function
                  </a>
                </li>
                <li>
                  Build your own visualization using climate and economic
                  modeling data with{' '}
                  <a {...anchorsProps} href="/my-climate-watch">
                    MyClimateWatch
                  </a>
                </li>
                <li>
                  Download data on emissions, countries targets, future pathways
                  and linkages between NDCs and SDGs in{' '}
                  <a {...anchorsProps} href="/data-explorer">
                    Data Explorer
                  </a>
                </li>
              </ol>
            </div>
          </Slider>
        </div>
      </section>
    );
  }
}

export default UserCasesSectionComponent;
