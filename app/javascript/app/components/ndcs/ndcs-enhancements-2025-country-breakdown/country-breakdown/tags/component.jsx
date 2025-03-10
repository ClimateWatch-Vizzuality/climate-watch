import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';

import { TAGS } from './constants';
import styles from './styles.scss';

const TagsComponent = ({ type, view }) => {
  const tags = TAGS[view][type];

  return (
    <div className={styles.tagsContainer}>
      {tags?.map(t => (
        <Tag key={t.label} label={t.label} color={t.color} />
      ))}
    </div>
  );
};

TagsComponent.propTypes = {
  type: PropTypes.oneOf(['conditional', 'unconditional']),
  view: PropTypes.oneOf(['baseline', 'target'])
};

export default TagsComponent;
