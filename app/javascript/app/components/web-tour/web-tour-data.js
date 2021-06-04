import React from 'react';
import Button from 'components/button';

export default (slug, setOpen) =>
  ({
    '/': [
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
            <Button variant="primary" onClick={() => setOpen(false)}>
              Done!
            </Button>
          </div>
        )
      }
    ]
  }[slug] || undefined);
