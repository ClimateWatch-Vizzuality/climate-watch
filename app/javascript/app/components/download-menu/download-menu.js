import { withProps } from 'recompose';
import Component from './download-menu-component';

const { S3_BUCKET_NAME } = process.env;

const server = `http://${S3_BUCKET_NAME}.s3.amazonaws.com`;
const folder = '/climate-watch-download-zip';
const url = `${server}${folder}`;
const downloadMenuOptions = [
  {
    label: 'All (12.3 MB)',
    link: `${url}/all.zip`,
    target: '_self'
  },
  {
    label: 'NDC Content (6.4 MB)',
    link: `${url}/ndc-content.zip`,
    target: '_self'
  },
  {
    label: 'GHG emissions (3.5 MB)',
    link: `${url}/ghg-emissions.zip`,
    target: '_self'
  },
  {
    label: 'Adaptation (357 kB)',
    link: `${url}/adaptation.zip`,
    target: '_self'
  },
  {
    label: 'Socioeconomic (450 kB)',
    link: `${url}/socioeconomic-indicators.zip`,
    target: '_self'
  },
  {
    label: 'Pathways (2.1 MB)',
    link: `${url}/pathways.zip`,
    target: '_self'
  },
  {
    label: 'NDC quantification (367 kB)',
    link: `${url}/ndc-quantification.zip`,
    target: '_self'
  }
];

const withOptions = withProps(() => ({
  downloadMenuOptions
}));

export default withOptions(Component);
