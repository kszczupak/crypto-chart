import { connect } from 'react-redux';

import DataRangePicker from '../components/DataRangePicker';

import { selectStartDate, selectEndDate } from '../actions';

const mapStateToProps = state => {};
const mapDispatchToProps = {
  selectStartDate,
  selectEndDate
};

export const DataRangePickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataRangePicker);
