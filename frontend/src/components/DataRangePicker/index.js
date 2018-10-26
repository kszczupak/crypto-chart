import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import AppActions from '../../actions/Actions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DataRangePicker extends Component {
  constructor(props) {
    super(props);
    this.defaultStartDate = '2017-05-24';
    this.defaultEndDate = '2017-05-25';
  }

  componentDidMount() {
    // Send default dates to store
    this.props.selectStartDate(this.defaultStartDate);
    this.props.selectEndDate(this.defaultEndDate);
  }

  handleStartDateSelect = event => {
    // ToDo Convert to 'my' date form
    this.props.selectStartDate(event.target.value);
  };

  handleEndDateSelect = event => {
    // ToDo Convert to 'my' date form
    this.props.selectEndDate(event.target.value);
  };

  render() {
    console.log(this.props);

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline" align="center">
          Select data range:
        </Typography>
        <Grid container justify="center" spacing={16}>
          <Grid key={4} item>
            <form className={classes.container} noValidate>
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                onChange={this.handleStartDateSelect}
                defaultValue={this.defaultStartDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>
          <Grid key={5} item>
            <form className={classes.container} noValidate>
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                onChange={this.handleEndDateSelect}
                defaultValue={this.defaultEndDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DataRangePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataRangePicker);
