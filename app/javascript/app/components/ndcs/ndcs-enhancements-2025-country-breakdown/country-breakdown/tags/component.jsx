import React from 'react';
import { Tag } from 'cw-components';

import styles from './styles.scss';

const TagsComponent = () => {
  const tags = [
    {
      label: '2030 Unconditional NDC Target',
      color: 'gray'
    },
    {
      label: '2035 Unconditional NDC Target',
      color: 'blue'
    }
  ];

  return (
    <div className={styles.tagsContainer}>
      {tags?.map(t => (
        <Tag key={t.label} label={t.label} color={t.color} />
      ))}
    </div>
  );
};

export default TagsComponent;
