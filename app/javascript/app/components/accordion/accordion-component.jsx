import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Icon from 'components/icon';
import cx from 'classnames';

import dropdownArrow from 'assets/icons/dropdown-arrow.svg';
import layout from 'styles/layout.scss';
import styles from './accordion-styles.scss';

const Accordion = props => {
  const {
    className,
    data,
    handleOnClick,
    children,
    isChild,
    hasNestedCollapse,
    openSlug
  } = props;

  const getIsOpen = (section, index) => {
    let isOpen = index === 0;
    if (openSlug && openSlug !== 'none') {
      const isActiveInResults = data.some(d => d.slug === openSlug);
      isOpen = openSlug === section.slug || (index === 0 && !isActiveInResults);
    } else {
      isOpen = false;
    }
    return isOpen;
  };

  return (
    <div className={className}>
      {data &&
        data.length > 0 &&
        data.map((section, index) => {
          const isOpen = getIsOpen(section, index);
          const title = section.parent
            ? `${section.parent.name} || ${section.title}`
            : section.title;
          return (
            <section
              key={`${section.slug}-${section.title}`}
              className={styles.accordion}
            >
              <button
                className={cx(styles.header, isChild ? styles.subHeader : '')}
                onClick={() => handleOnClick(section.slug, isOpen)}
              >
                <div className={layout.content}>
                  <div className={styles.title}>
                    {title}
                    <Icon
                      icon={dropdownArrow}
                      className={cx(styles.iconArrow, {
                        [styles.isOpen]: isOpen
                      })}
                    />
                  </div>
                </div>
              </button>
              <Collapse isOpened={isOpen} hasNestedCollapse={hasNestedCollapse}>
                {isOpen && (
                  <div>
                    {React.Children.map(children, (child, i) => {
                      if (i === index) return child;
                      return null;
                    })}
                  </div>
                )}
              </Collapse>
            </section>
          );
        })}
    </div>
  );
};

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
  isChild: PropTypes.bool,
  hasNestedCollapse: PropTypes.bool
};

Accordion.defaultProps = {
  data: []
};

export default Accordion;
