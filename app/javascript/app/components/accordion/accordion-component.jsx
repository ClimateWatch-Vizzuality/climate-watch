import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './accordion-styles.scss';

class Accordion extends PureComponent {
  render() {
    const {
      className,
      data,
      handleOnClick,
      openSlug,
      children,
      isChild
    } = this.props;
    return (
      <div className={className}>
        {data &&
          data.length > 0 &&
          data.map((section, index) => {
            let isOpen = index === 0;
            if (openSlug) {
              if (openSlug !== 'none') {
                const isActiveInResults = data.some(d => d.slug === openSlug);
                isOpen =
                  openSlug === section.slug ||
                  (index === 0 && !isActiveInResults);
              } else {
                isOpen = false;
              }
            }
            return (
              <section
                key={`${section.slug}-${section.title}`}
                className={styles.accordion}
              >
                <button
                  className={cx(styles.header, isChild ? styles.subHeader : '')}
                  onClick={() => handleOnClick(section.slug)}
                >
                  <div className={layout.content}>
                    <div className={styles.title}>
                      {section.title}
                      <Icon
                        icon={dropdownArrow}
                        className={cx(styles.iconArrow, {
                          [styles.isOpen]: isOpen
                        })}
                      />
                    </div>
                  </div>
                </button>
                <Collapse isOpened={isOpen}>
                  <div />
                  {React.Children.map(children, (child, i) => {
                    if (i === index) return child;
                    return null;
                  })}
                </Collapse>
              </section>
            );
          })}
      </div>
    );
  }
}

Accordion.propTypes = {
  className: PropTypes.string,
  openSlug: PropTypes.string,
  handleOnClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      definitions: PropTypes.array
    })
  ),
  children: PropTypes.node,
  isChild: PropTypes.bool
};

Accordion.defaultProps = {
  data: []
};

export default Accordion;
