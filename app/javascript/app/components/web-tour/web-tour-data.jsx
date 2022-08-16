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
            <h2 className={styles.title}>UNFCCC DOCUMENTS TIMELINE </h2>
            <p className={styles.description}>
              Access all the official documents that the country submitted to
              the UNFCCC directly from here.
            </p>
          </div>
        )
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
        )
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
        )
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
        )
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
        )
      },
      {
        selector: '[data-tour="countries-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>INFO BUTTON</h2>
            <p className={styles.description}>
              Access the full information on the datasets used in this graphic,
              including sources and citations.{' '}
              <a
                href="/about/faq/general_questions"
                target="_blank"
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
    '/ndcs-explore': [
      {
        selector: '[data-tour="ndc-explore-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>KEYWORD SEARCH</h2>
            <p className={styles.description}>
              Type any keyword or phrase you want to find in NDCs and get
              instant access to the documents and a map with all the countries
              that mention your search. TIP: for phrases, add quotation marks
              (e.g., “nature based”)
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-explore-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>KEY INDICATORS</h2>
            <p className={styles.description}>
              Explore the different Categories and Indicators to generate new
              visualizations.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-explore-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize key NDC indicators and find out what each country is
              proposing in their climate commitments.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-explore-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN-DEPTH NDC ANALYSIS</h2>
            <p className={styles.description}>
              Click on a country for a more detailed analysis on its latest NDC
              and previous submissions.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-explore-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore all the values shown in the map above and find out more
              details with this table view. You can sort values (ideal to find
              latest submissions) and search for key terms.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-explore-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
      }
    ],
    '/lts-explore': [
      {
        selector: '[data-tour="lts-explore-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>KEY INDICATORS</h2>
            <p className={styles.description}>
              Explore the different Categories and Indicators to generate new
              visualizations.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="lts-explore-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize key indicators and find out what each country is
              proposing in their climate commitments.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="lts-explore-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN-DEPTH LTS ANALYSIS</h2>
            <p className={styles.description}>
              Click on a country for a more detailed analysis on its Long-Term
              Strategy.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="lts-explore-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore all the values shown in the map above and find out more
              details with this table view. You can sort values (ideal to find
              latest submissions) and search for key terms.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="lts-explore-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
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
        )
      },
      {
        selector: '[data-tour="net-zero-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize key indicators and find out what each country is
              proposing in their climate commitments.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="net-zero-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN-DEPTH NET-ZERO ANALYSIS</h2>
            <p className={styles.description}>
              Click on a country to see its climate profile.
            </p>
          </div>
        )
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
        )
      },
      {
        selector: '[data-tour="net-zero-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
      }
    ],
    '/2020-ndc-tracker': [
      {
        selector: '[data-tour="ndc-enhancement-tracker-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY SEARCH</h2>
            <p className={styles.description}>
              Type the country that you are interested in to access their
              climate related documents and to filter them down in the table
              view below.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-enhancement-tracker-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MAP</h2>
            <p className={styles.description}>
              Visualize the latest NDC submissions and keep track of countries
              with enhanced ambition.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-enhancement-tracker-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore all the values shown in the map above and find out more
              details with this table view. You can sort values (ideal to find
              latest submissions) and search for key terms.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndc-enhancement-tracker-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
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
        action: () => clickAction('ndcs-sdg-01') // Close target
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
        )
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
        action: () => clickAction('ndcs-sdg-03') // Open first targe
      },
      {
        selector: '[data-tour="ndcs-sdg-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
      }
    ],
    '/ndcs/country': [
      {
        selector: '[data-tour="ndcs-country-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>CLIMATE COMMITMENT CHOSEN</h2>
            <p className={styles.description}>
              Click on the dropdown arrow to change between different versions
              of the country{"'"}s NDCs and explore our analysis.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndcs-country-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>FULL HTML TEXT</h2>
            <p className={styles.description}>
              Access the full NDC document transcribed into HTML for better
              analysis and searchability functionality.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndcs-country-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>DOWNLOAD ORIGINAL DOCUMENT </h2>
            <p className={styles.description}>
              Download the original PDF document of this climate commitment.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndcs-country-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>HIGH LEVEL OVERVIEW </h2>
            <p className={styles.description}>
              Access a summary of the country{"'"}s climate commitment broken
              down into top level indicators.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ndcs-country-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN DEPTH ANALYSIS </h2>
            <p className={styles.description}>
              Explore our analysis of the NDCs covering more than 160
              indicators, divided into these four categories: Overview,
              Mitigation, Adaptation and Sectoral Information.
            </p>
          </div>
        )
      }
    ],
    '/compare-all-targets': [
      {
        selector: '[data-tour="compare-all-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>LEGEND</h2>
            <p className={styles.description}>
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
            <h2 className={styles.title}>COUNTRY LIST</h2>
            <p className={styles.description}>
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
            <h2 className={styles.title}>CLIMATE COMMITMENTS</h2>
            <p className={styles.description}>
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
            <h2 className={styles.title}>COMPARE</h2>
            <p className={styles.description}>
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
            <h2 className={styles.title}>CLEAR</h2>
            <p className={styles.description}>
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
            <h2 className={styles.title}>KEYWORD SEARCH</h2>
            <p className={styles.description}>
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
              including sources and citations.{' '}
              <a
                href="/about/faq/general_questions"
                target="_blank"
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
    '/custom-compare': [
      {
        selector: '[data-tour="custom-compare-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>IN DEPTH ANALYSIS</h2>
            <p className={styles.description}>
              Explore our analysis of the NDCs covering more than 160
              indicators, divided into these four categories: Overview,
              Mitigation, Adaptation and Sectoral Information.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="custom-compare-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY SELECTION</h2>
            <p className={styles.description}>
              Switch between different countries by clicking in the dropdown
              option or by typing.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="custom-compare-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COMMITMENTS SELECTION</h2>
            <p className={styles.description}>
              Switch between the different climate commitments available within
              the country.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="custom-compare-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>INDICATORS </h2>
            <p className={styles.description}>
              Click on the drop down menus to explore among our more than 160
              indicators.
            </p>
          </div>
        )
      }
    ],
    '/ghg': [
      {
        selector: '[data-tour="ghg-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>FILTERS</h2>
            <p className={styles.description}>
              Explore the different drop-down options to filter and adjust your
              selection and the visualization underneath.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ghg-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>GRAPH</h2>
            <p className={styles.description}>
              Visualize the historic GHG emissions values from your selection
              and hover over the graph to get more details.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ghg-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TIME BAR</h2>
            <p className={styles.description}>
              Adjust the handles to select the timespan that you are interested
              about.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ghg-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore the values from your selection in a table format.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ghg-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>WHAT DATA SOURCE SHOULD I USE?</h2>
            <p className={styles.description}>
              This is the most common question we get. To get a better idea on
              which of our four data sources you should use, click on this FAQ
              link to find out more in a summary table.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="ghg-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE </h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the map,
              share the content in multiple formats, or to explore the sources
              and citations of the datasets.
            </p>
          </div>
        )
      }
    ],
    '/data-explorer': [
      {
        selector: '[data-tour="data-explorer-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>DOWNLOAD BULK DATA</h2>
            <p className={styles.description}>
              Select between the different options in this drop-down menu to
              download directly the raw data files in csv format.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="data-explorer-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>FILTER BY MODULE</h2>
            <p className={styles.description}>
              Select between the different tabs to choose the module you want to
              extract data from.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="data-explorer-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>DATA FILTERS</h2>
            <p className={styles.description}>
              Explore the different drop-down options to filter and adjust your
              selection.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="data-explorer-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>TABLE VIEW</h2>
            <p className={styles.description}>
              Explore the values from your selection in a table format.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="data-explorer-05"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO</h2>
            <p className={styles.description}>
              Toggle between these tabs to find out more about the data sources
              and citations.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="data-explorer-06"]',
        content: () => (
          <div>
            <h2 className={styles.title}>API CALLS</h2>
            <p className={styles.description}>
              Find out more about how to link our API data directly into your
              website.
            </p>
          </div>
        )
      }
    ],
    '/key-visualizations': [
      {
        selector: '[data-tour="key-visualizations-01"]',
        content: () => (
          <div>
            <h2 className={styles.title}>FILTERS</h2>
            <p className={styles.description}>
              Explore the different drop-down options to filter down the
              visualizations.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="key-visualizations-02"]',
        content: () => (
          <div>
            <h2 className={styles.title}>VISUALIZATIONS</h2>
            <p className={styles.description}>
              Click on any visualization to expand it and interact with it.
            </p>
          </div>
        )
      }
    ],
    '/key-visualizations?': [
      {
        selector: '[data-tour="key-visualizations-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>MORE INFO, DOWNLOAD & SHARE</h2>
            <p className={styles.description}>
              Click on these icons to download the raw data shown in the
              visualization, share the content in multiple formats, or to
              explore the sources and citations of the datasets.
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
            <h2 className={styles.title}>NOTIFICATION BELL</h2>
            <p className={styles.description}>
              Find out our latest updates on datasets and NDCs by clicking here.
            </p>
          </div>
        )
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
        )
      },
      {
        selector: '[data-tour="home-03"]',
        content: () => (
          <div>
            <h2 className={styles.title}>HISTORIC GHG EMISSIONS</h2>
            <p className={styles.description}>
              Access the most comprehensive database on countries{"'"} historic
              GHG emissions and filter down the data through our multiple
              indicators.
            </p>
          </div>
        )
      },
      {
        selector: '[data-tour="home-04"]',
        content: () => (
          <div>
            <h2 className={styles.title}>COUNTRY PROFILES </h2>
            <p className={styles.description}>
              Access an overview assessment on countries{"'"} climate situation
              through our curated list of key indicators.
            </p>
          </div>
        )
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
        )
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
        )
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
        )
      }
    ]
  };

  let pathSteps = null;
  Object.keys(stepsByPathname).some(path => {
    if (pathname.startsWith(path)) {
      pathSteps = stepsByPathname[path].map(step => ({
        ...step,
        position: 'top'
      }));
      return true;
    }
    return false;
  });
  return pathSteps;
};
