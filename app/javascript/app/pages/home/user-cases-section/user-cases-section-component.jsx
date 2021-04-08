import React, { Component } from 'react';
import { Icon } from 'cw-components';
import Slider from 'react-slick';
import { TabletLandscape } from 'components/responsive';
// Assets
import userIcon from 'assets/icons/user.svg';
import politicianImg from 'assets/home/government@2x.jpg';
import researcherImg from 'assets/home/researcher@2x.jpg';
import activistImg from 'assets/home/activist@2x.jpg';

import { slidesData } from './user-cases-section-data';

import styles from './user-cases-section-styles.scss';

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
      <p>{slidesData[i].pagingTitle}</p>
    </div>
  )
};

const paragraphTextCreator = (text, anchor, href) => {
  const link = `<a rel="noopener norefer" target="_blank" href="${href}">${anchor}</a>`;
  const updatedText = text.replace(anchor, link);
  return { __html: updatedText };
};

class UserCasesSectionComponent extends Component {
  render() {
    return (
      <section className={styles.container}>
        <div className={styles.carouselWrapper}>
          <TabletLandscape>
            <Slider
              ref={slider => {
                this.leftSlider = slider;
              }}
              slidesToShow={1}
              autoplay={false}
              beforeChange={(current, next) =>
                this.rightSlider && this.rightSlider.slickGoTo(next)
              }
              fade
            >
              <div>
                <div
                  className={styles.carouselImage}
                  style={{ backgroundImage: `url(${politicianImg})` }}
                />
              </div>
              <div>
                <div
                  className={styles.carouselImage}
                  style={{ backgroundImage: `url(${researcherImg})` }}
                />
              </div>
              <div>
                <div
                  className={styles.carouselImage}
                  style={{ backgroundImage: `url(${activistImg})` }}
                />
              </div>
            </Slider>
          </TabletLandscape>
          <Slider
            ref={slider => {
              this.rightSlider = slider;
            }}
            beforeChange={(current, next) =>
              this.leftSlider && this.leftSlider.slickGoTo(next)
            }
            {...settings}
          >
            {slidesData.map(slide => (
              <div
                className={styles.slideWrapper}
                key={slide.paragraphs[0].text}
                bottomSlide
              >
                <h3 className={styles.slideTitle}>{slide.title}</h3>
                <ol className={styles.slideList}>
                  {slide.paragraphs.map(p => (
                    <li
                      key={p.text}
                      dangerouslySetInnerHTML={paragraphTextCreator(
                        p.text,
                        p.anchorText,
                        p.href
                      )}
                    />
                  ))}
                </ol>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}

export default UserCasesSectionComponent;
