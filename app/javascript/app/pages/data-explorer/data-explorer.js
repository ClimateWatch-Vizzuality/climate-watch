import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import DataExplorer from './data-explorer-component';

const { S3_BUCKET_NAME } = process.env;

const server = `http://${S3_BUCKET_NAME}.s3.amazonaws.com`;
const folder = '/climate-watch-download-zip';

const mapStateToProps = (state, { route, location }) => ({
  navLinks: route.routes.filter(r => r.anchor).map(r => {
    const updatedR = r;
    updatedR.hash = location.hash;
    return updatedR;
  }),
  allDataUrl: `${server}${folder}/all.zip`
});

export default withRouter(connect(mapStateToProps, null)(DataExplorer));
