import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

class CreateItem extends React.Component {
  constructor() {
    super();

    this.onChangeBind = this.onChange.bind(this);
    this.onDateChangeBind = this.onDateChange.bind(this);
  }

  onChange(e) {
    this.props.onChange('name', e.target.value);
  }

  onDateChange(value) {
    this.props.onChange('dueDate', value);
  }

  render() {
    const { onSubmit, item } = this.props;
    return (
      <div>
        <div className="f4 bold mw6">Add something:</div>
        <div className="ma3">
          <div className="f5 fw6 ph0 mh0">Name:</div>
          <input type='text' value={item.name} onChange={this.onChangeBind} />
        </div>
        <div className="ma3">
          <div className="f5 fw6 ph0 mh0">Due:</div>
          <DatePicker selected={item.dueDate} onChange={this.onDateChangeBind} showTimeSelect />
        </div>
        <div className='pointer link dim br2 ph3 pv2  ma3 mb2 dib white bg-black' onClick={onSubmit}>+ New Item</div>
      </div>
    );
  }
}

CreateItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default CreateItem;
