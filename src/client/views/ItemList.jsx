import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

class ItemList extends React.Component {
  render() {
    return (
      <div>
        <div className="f4 bold center mw6">To Do:</div>
        <ul className="list pl0 ml0 center mw6 ba b--light-silver br2">
          { this.props.items.map((item) => {
            return <Item key={item._id} value={item} toggleComplete={this.props.handleComplete(item._id)} />;
          })}
          { (this.props.items.length === 0) && 'Nothing to do!'}
        </ul>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  handleComplete: PropTypes.func.isRequired
};

export default ItemList;
