import React from 'react';
import styles from './web-tour-styles.scss';

export default (pathname, setOpen) => {
  const stepsByPathname = {
    '/countries': [
      {
        selector: '[data-tour="countries-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>UNFCCC DOCUMENTS TIMELINE​</h2>
            <p className={styles.description}>
              Access all the official documents that the country submitted to
              the UNFCCC directly from here.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="countries-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY OVERVIEWS</h2>
            <p className={styles.description}>
              Explore the different tabs to get an overview of the country’s
              climate situation.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="countries-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>EXPLORE MORE</h2>
            <p className={styles.description}>
              Each section contains a highlight summary on each topic, but you
              can explore the data more in depth by clicking the yellow buttons
              and accessing the main modules.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="countries-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>DOWNLOAD</h2>
            <p className={styles.description}>
              Download the raw data in csv format by clicking this button.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="countries-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>SHARE</h2>
            <p className={styles.description}>
              Share this graphic in multiple ways by clicking this button.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="countries-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>INFO BUTTON</h2>
            <p className={styles.description}>
              Access the full information on the datasets used in this graphic,
              including sources and citations.​{' '}
              <a
                href="/about/faq/general_questions"
                onClick={() =>
                  setOpen({
                    isOpen: false
                  })
                }
              >
                For more general questions, you can access our FAQ
              </a>
            </p>
          </div>
        ),
        position: 'bottom'
      }
    ],
    '/ndcs-explore': [
      {
        selector: '[data-tour="commitments-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>KEYWORD SEARCH​</h2>
            <p className={styles.description}>
              AType any keyword or phrase you want to find in NDCs and get
              instant access to the documents and a map with all the countries
              that mention your search. TIP: for phrases, add quotation marks
              (e.g., “nature based”)
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="commitments-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>KEY INDICATORS</h2>
            <p className={styles.description}>
              Explore the different Categories and Indicators to generate new
              visualizations.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="commitments-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize key NDC indicators and find out what each country is
              proposing in their climate commitments.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="commitments-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN-DEPTH NDC ANALYSIS</h2>
            <p className={styles.description}>
              Click on a country for a more detailed analysis on its latest NDC
              and previous submissions.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="commitments-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore all the values shown in the map above and find out more
              details with this table view. You can sort values (ideal to find
              latest submissions) and search for key terms.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="commitments-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE​</h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        ),
        position: 'bottom'
      }
    ],
    '/compare-all-targets': [
      {
        selector: '[data-tour="compare-all-01"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            <p>
              In this page you can choose up to three countries’ commitments and
              compare them among +160 indicators.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-02"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            <p>
              This table summarizes every country’s commitment and indicates
              whether a documentwas Submitted, Not submitted, or if the country
              intends to submit.You can choose up to 3 documents to compare.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-03"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            The Keyword Search allows you to easily find a country and select
            their commitments for comparisons
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-04"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            <p>
              To change the options you selected, you can click again on the
              table or simple click ”Clear” to undo your selection.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-05"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            <p>
              Once you are done with your selection, click “Compare” to see the
              side by side comparison.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-06"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            <p>You are now ready to use this module!</p>
          </div>
        )
      }
    ],
    '/': [
      {
        selector: '[data-tour="home-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>NOTIFICATION BELL​</h2>
            <p className={styles.description}>
              Find out our latest updates on datasets and NDCs by clicking here.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>DOWNLOAD & VISUALIZE</h2>
            <p className={styles.description}>
              Download the raw data from all modules and access our most
              appealing visualizations on GHG emissions.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>HISTORIC GHG EMISSIONS​</h2>
            <p className={styles.description}>
              Access the most comprehensive database on countries{"'"} historic
              GHG emissions and filter down the data through our multiple
              indicators.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY PROFILES​</h2>
            <p className={styles.description}>
              Access an overview assessment on countries{"'"} climate situation
              through our curated list of key indicators.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>CLIMATE COMMITMENTS</h2>
            <p className={styles.description}>
              Find out the latest data on countries{"'"} main climate
              commitments, including NDCs, LTSs, Net-Zero targets, SDGs and
              more.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>SECTORAL INFORMATION</h2>
            <p className={styles.description}>
              Explore our indicators on sectoral information.
            </p>
          </div>
        ),
        position: 'bottom'
      },
      {
        selector: '[data-tour="home-07"]',
        content: () => (
          <div>
            <h2 className={styles.title}>PATHWAYS</h2>
            <p className={styles.description}>
              Explore our indicators on future economic and emissions scenarios.
            </p>
          </div>
        ),
        position: 'bottom'
      }
    ]
  };

  let pathSteps = null;
  Object.keys(stepsByPathname).some(path => {
    if (pathname.startsWith(path)) {
      pathSteps = stepsByPathname[path];
      return true;
    }
    return false;
  });
  return pathSteps;
};
