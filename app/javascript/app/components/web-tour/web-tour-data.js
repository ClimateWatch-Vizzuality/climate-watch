import React from 'react';
import Button from 'components/button';

export default (slug, setOpen) =>
  ({
    home: [
      {
        selector: '[data-tour="home-01"]',
        content: () => (
          <div>
            <p>
              This upper menu takes you to the main modules of Climate Watch.
            </p>
            <p>Click on one of them to further explore</p>
          </div>
        )
      }
    ],
    commitments: [
      {
        selector: '[data-tour="commitments-01"]',
        content: () => (
          <div>
            Here you can find all the information related to Climate commitments
            including World maps showing countries{"'"} progress and current
            status
          </div>
        )
      }
    ],
    'compare-all': [
      {
        selector: '[data-tour="compare-all-01"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            In this page you can choose up to three countries’commitments and
            compare them among +160 indicators.
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-02"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            1# - This table summarizes every country’scommitment and indicates
            whether a documentwas Submitted, Not submitted, or if the
            countryintends to submit.You can choose up to 3 Documents to compare
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-03"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            2# - The Keyword Search allows you to easily finda country and
            select their commitments for comparisons
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-04"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            3# - To change the options you selected, you canclick again on the
            table or simple click ”Clear” toundo your selection.
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-05"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            4# - Once you are done with your selection, click “Compare” to see
            the side by side comparison.
          </div>
        )
      },
      {
        selector: '[data-tour="compare-all-06"]',
        content: () => (
          <div>
            <h2>COMPARE ALL TARGETS</h2>
            You are now ready to use this module!
            <Button variant="primary" onClick={() => setOpen(false)}>
              Done!
            </Button>
          </div>
        )
      }
    ]
  }[slug] || undefined);
