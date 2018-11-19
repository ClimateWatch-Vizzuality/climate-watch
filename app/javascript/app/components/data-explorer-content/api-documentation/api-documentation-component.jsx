import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import linkIcon from 'assets/icons/link.svg';
import Icon from 'components/icon';
import styles from './api-documentation-styles.scss';

class ApiDocumentationContent extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { data, handleAnalyticsTryLink } = this.props;
    return (
      <div className={styles.documentation}>
        <p>
          To use this data in your own applications, please see our API
          documentation below:
        </p>
        <h3 className={styles.sectionTitle}>API Calls</h3>
        {data.map(d => (
          <div key={d.title} className={styles.call}>
            <p className={styles.title}>
              {d.title}
              <a
                className={styles.tryLink}
                href={d.url}
                target="_blank"
                onClick={handleAnalyticsTryLink}
              >
                <Icon icon={linkIcon} />
                <span> TRY IT </span>
              </a>
            </p>
            <p className={styles.description}>{d.description}</p>
            <div className={styles.queryParams}>
              {d.queryParams && (
                <div>
                  <p>Query Parameters</p>
                  <div className={styles.queryParamsList}>
                    {d.queryParams.map(q => (
                      <div key={q.name}>
                        <span className={styles.parameterName}>{q.name}</span>
                        <span> - {q.parameter} - </span>
                        <span>{q.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className={styles.extra}>{d.extra}</p>
          </div>
        ))}
      </div>
    );
  }
}

ApiDocumentationContent.propTypes = {
  data: PropTypes.array.isRequired,
  handleAnalyticsTryLink: PropTypes.func.isRequired
};

export default ApiDocumentationContent;
