import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Item extends React.Component {
  render() {
    const { completed, name, dueDate } = this.props.value;
    return (
      <li className="ph3 pv3 bb b--light-silver">
        <div className="flex items-center mb2">
          <div className="flex-auto">
            <input className="mr2" type="checkbox" checked={completed} onChange={this.props.toggleComplete} />
            <label className="lh-copy">{name}</label>
          </div>
          {dueDate  && moment(dueDate).format('ddd, hA')}
        </div>
      </li>
    );
  }
}

Item.propTypes = {
  value: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    name: PropTypes.string,
    dueDate: PropTypes.string.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired
};

export default Item;
