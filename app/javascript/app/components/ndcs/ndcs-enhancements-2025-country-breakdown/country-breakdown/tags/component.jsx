import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';

import { TAGS } from './constants';
import styles from './styles.scss';

const TagsComponent = ({ type }) => {
  const tags = TAGS[type];

  return (
    <div className={styles.tagsContainer}>
      {tags?.map(t => (
        <Tag key={t.label} label={t.label} color={t.color} />
      ))}
    </div>
  );
};

TagsComponent.propTypes = {
  type: PropTypes.oneOf(['conditional', 'unconditional'])
};

export default TagsComponent;
