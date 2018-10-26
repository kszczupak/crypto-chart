import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Container } from 'flux/utils';
// import DataRangeStore from '../../stores/DataRangeStore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class DataRangeComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid key={4} item>
          <Typography variant="headline">{this.props.startDate}</Typography>
        </Grid>
        <Grid key={5} item>
          <Typography variant="headline">{this.props.endDate}</Typography>
        </Grid>
      </Grid>
    );
  }
}

// DataRangeComponent.getStores = () => [DataRangeStore];
// DataRangeComponent.calculateState = prevState => ({
//   startDate: DataRangeStore.getState()[0],
//   endDate: DataRangeStore.getState()[1]
// });

const mapStateToProps = state => {
  return {
    startDate: state.dataRange.startDate,
    endDate: state.dataRange.endDate
  };
};

// const DataRangeContainer = Container.create(DataRangeComponent);

const DataRangeContainer = connect(mapStateToProps)(DataRangeComponent);

export default DataRangeContainer;
