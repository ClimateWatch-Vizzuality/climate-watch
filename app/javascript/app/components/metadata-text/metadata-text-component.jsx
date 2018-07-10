import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Disclaimer from 'components/disclaimer';
import { toStartCase } from 'utils/utils';
import { isArray } from 'util';
import styles from './metadata-text-styles.scss';

const MetadataAllProps = ({ data }) =>
  Object.keys(data)
    .sort(a => (a === 'logo' ? 1 : -1))
    .map(
      key =>
        data[key] &&
        !isArray(data[key]) && (
          <MetadataProp key={key} title={key} data={data[key]} />
        )
    );

MetadataAllProps.propTypes = {
  data: PropTypes.array.isRequired
};

const urlTitles = ['url', 'Link'];
const MetadataProp = ({ title, data }) =>
  data &&
  (title === 'logo' ? (
    <img src={`https:${data}`} />
  ) : (
    <p className={styles.text}>
      <span className={styles.textHighlight}>{toStartCase(title)}: </span>
      {urlTitles.includes(title) ? (
        <a className={styles.link} href={data}>
          {data}
        </a>
      ) : (
        <span
          className={cx({
            [styles.empty]: data === 'Not specified'
          })}
        >
          {data}
        </span>
      )}
    </p>
  ));

MetadataProp.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};

class MetadataText extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { disclaimerConfig, data, className, showAll } = this.props;
    const {
      learn_more_link,
      source_organization,
      technical_title,
      summary,
      citation,
      cautions,
      geographic_coverage,
      description,
      date_of_content,
      summary_of_licenses,
      terms_of_service_link
    } = this.props.data;
    const displayDisclaimer = disclaimerConfig && disclaimerConfig.display;

    return (
      <div key={data.source} className={cx(styles.textContainer, className)}>
        {showAll ? (
          <MetadataAllProps data={data} />
        ) : (
          <div>
            {technical_title && (
              <MetadataProp title="Title">{technical_title}</MetadataProp>
            )}
            {date_of_content && (
              <MetadataProp title="Date of content">
                {date_of_content}
              </MetadataProp>
            )}
            {source_organization && (
              <MetadataProp title="Source organization">
                {source_organization}
              </MetadataProp>
            )}
            {summary && <MetadataProp title="Summary">{summary}</MetadataProp>}
            {description && (
              <MetadataProp title="Description">{description}</MetadataProp>
            )}
            {geographic_coverage && (
              <MetadataProp title="Geographic Coverage">
                {geographic_coverage}
              </MetadataProp>
            )}
            {cautions && (
              <MetadataProp title="Cautions">{cautions}</MetadataProp>
            )}
            {learn_more_link && (
              <MetadataProp title="Read more">
                <a key="link" className={styles.link} href={learn_more_link}>
                  {' '}
                  {learn_more_link}{' '}
                </a>
              </MetadataProp>
            )}
            {summary_of_licenses && (
              <MetadataProp title="Summary of licenses">
                {summary_of_licenses}
              </MetadataProp>
            )}
            {citation && (
              <MetadataProp title="Citation">{citation}</MetadataProp>
            )}
            {terms_of_service_link && (
              <MetadataProp title="Terms of service link">
                <a
                  key="link"
                  className={styles.link}
                  href={terms_of_service_link}
                >
                  {' '}
                  {terms_of_service_link}{' '}
                </a>
              </MetadataProp>
            )}
            {displayDisclaimer && (
              <Disclaimer onlyText={disclaimerConfig.onlyText} />
            )}
          </div>
        )}
      </div>
    );
  }
}

MetadataText.propTypes = {
  data: PropTypes.object,
  disclaimerConfig: PropTypes.object,
  className: PropTypes.string,
  showAll: PropTypes.bool
};

export default MetadataText;
