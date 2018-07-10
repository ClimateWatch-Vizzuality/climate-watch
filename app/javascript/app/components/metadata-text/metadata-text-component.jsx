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
  data: PropTypes.node.isRequired
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
              <MetadataProp title="Title" data={technical_title} />
            )}
            {date_of_content && (
              <MetadataProp title="Date of content" data={date_of_content} />
            )}
            {source_organization && (
              <MetadataProp
                title="Source organization"
                data={source_organization}
              />
            )}
            {summary && <MetadataProp title="Summary" data={summary} />}
            {description && (
              <MetadataProp title="Description" data={description} />
            )}
            {geographic_coverage && (
              <MetadataProp
                title="Geographic Coverage"
                data={geographic_coverage}
              />
            )}
            {cautions && <MetadataProp title="Cautions" data={cautions} />}
            {learn_more_link && (
              <MetadataProp
                title="Read more"
                data={
                  <a key="link" className={styles.link} href={learn_more_link}>
                    {' '}
                    {learn_more_link}{' '}
                  </a>
                }
              />
            )}
            {summary_of_licenses && (
              <MetadataProp
                title="Summary of licenses"
                data={summary_of_licenses}
              />
            )}
            {citation && <MetadataProp title="Citation" data={citation} />}
            {terms_of_service_link && (
              <MetadataProp
                title="Terms of service link"
                data={
                  <a
                    key="link"
                    className={styles.link}
                    href={terms_of_service_link}
                  >
                    {' '}
                    {terms_of_service_link}{' '}
                  </a>
                }
              />
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
