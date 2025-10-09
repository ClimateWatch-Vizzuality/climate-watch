import React from 'react';
import PropTypes from 'prop-types';

import Tag from 'components/tag';

import styles from './styles.scss';

const TagsComponent = ({ tags = [] }) => (
  <div className={styles.tagsContainer}>
    {tags?.map((t) => (
      <>
        {t?.type ? (
          <Tag key={t.label} label={t.label}>
            <>
              {t?.type === 'historical-line' && (
                <span className={styles.historical} />
              )}
              {t?.type === 'projection-line' && (
                <span className={styles.projection} />
              )}
            </>
          </Tag>
        ) : (
          <Tag key={t.label} label={t.label} color={t.color} />
        )}
      </>
    ))}
  </div>
);

TagsComponent.propTypes = {
  tags: PropTypes.arrayOf({
    type: 'historical-line' || 'projection-line',
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
};

export default TagsComponent;
