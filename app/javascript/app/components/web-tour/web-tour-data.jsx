import React from 'react';
import styles from './web-tour-styles.scss';

const clickAction = selector => {
  const element = document.querySelector(`[data-tour-action=${selector}]`);
  if (element) {
    element.click();
  }
};

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
              Type any keyword or phrase you want to find in NDCs and get
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
        position: 'top'
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
        position: 'top'
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
        position: 'top'
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
    '/net-zero-tracker': [
      {
        selector: '[data-tour="net-zero-01"]',
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
        selector: '[data-tour="net-zero-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize key NDC indicators and find out what each country is
              proposing in their climate commitments.
            </p>
          </div>
        ),
        position: 'top'
      },
      {
        selector: '[data-tour="net-zero-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN-DEPTH NET-ZERO ANALYSIS</h2>
            <p className={styles.description}>
              Click on a country for a more detailed analysis on its latest NDC
              and previous submissions.
            </p>
          </div>
        ),
        position: 'top'
      },
      {
        selector: '[data-tour="net-zero-04"]',
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
        position: 'top'
      },
      {
        selector: '[data-tour="net-zero-05"]',
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
    '/ndcs-sdg': [
      {
        selector: '[data-tour="ndcs-sdg-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>SDG TARGETS</h2>
            <p className={styles.description}>
              Hover over the different SDGs to visualize how relevant they are
              for each country. Click on them to find out more information about
              each SDG’s targets.
            </p>
          </div>
        ),
        action: () => clickAction('ndcs-sdg-01'), // Close targets
        position: 'top'
      },
      {
        selector: '[data-tour="ndcs-sdg-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY LINK TO SDGs</h2>
            <p className={styles.description}>
              Hover over countries to visualize how many targets they linked in
              their NDCs. Click on them see the links directly into the NDC
              documents.
            </p>
          </div>
        ),
        position: 'top'
      },
      {
        selector: '[data-tour="ndcs-sdg-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>SDG TARGETS</h2>
            <p className={styles.description}>
              Click on each SDG target to visualize the countries that have
              direct linkages to them.
            </p>
          </div>
        ),
        action: () => clickAction('ndcs-sdg-03'), // Open first target
        position: 'top'
      },
      {
        selector: '[data-tour="ndcs-sdg-04"]',
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
            <h2>LEGEND</h2>
            <p>
              These legends indicate the status of any given Climate Commitment
              in the table below.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-02"]',
        content: () => (
          <div>
            <h2>COUNTRY LIST</h2>
            <p>
              Find any country you are interested in by scrolling down this
              list.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-03"]',
        content: () => (
          <div>
            <h2>CLIMATE COMMITMENTS</h2>
            <p>
              Click in the boxes and select up to three different Climate
              Commitments to compare.
            </p>
            <span className={styles.bold}>TIP:</span> Select different
            commitments from a same country to evaluate their evolution, or
            choose among different countries to see regional differences
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-04"]',
        content: () => (
          <div>
            <h2>COMPARE</h2>
            <p>
              Once you clicked on up to three climate commitments in the boxes
              below, click the yellow button to access the comparison page.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-05"]',
        content: () => (
          <div>
            <h2>CLEAR</h2>
            <p>
              Once you clicked on up to three climate commitments, select
              “Clear” to choose other commitments.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-06"]',
        content: () => (
          <div>
            <h2>KEYWORD SEARCH</h2>
            <p>
              Find countries more easily in the list below by typing their names
              in this box.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-07"]',
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
