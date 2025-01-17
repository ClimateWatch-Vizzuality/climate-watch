import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'cw-components';

import styles from './styles.scss';

const TagsComponent = ({ tags = [] }) => (
  <div className={styles.tagsContainer}>
    {tags?.map((t) => (
      <Tag key={t.label} label={t.label} color={t.color} />
    ))}
  </div>
);

TagsComponent.propTypes = {
  tags: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
};

export default TagsComponent;
