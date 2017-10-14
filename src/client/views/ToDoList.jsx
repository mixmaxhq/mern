import React from 'react';
import moment from 'moment';

import ItemList from './ItemList';
import CreateItem from './CreateItem';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: [],
      item: {
        name: '',
        dueDate: moment(),
        completed: false
      }
    };

    this.onSubmitBind = this.onSubmit.bind(this);
    this.onChangeBind = this.onChange.bind(this);
    this.handleCompleteBind = this.handleComplete.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });

    this.fetchItems().then((json) => {
      this.setState({ loading: false, items: json.results });
    });
  }

  fetchItems() {
    return fetch('/api').then((res) => {
      return res.json();
    });
  }

  onSubmit() {
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state.item),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api', options).then((res) => {
      return res.json();
    }).then((json) => {
      const items = new Array(...this.state.items);
      items.push(json);
      this.setState({ items, item: { name: '', dueDate: moment(), completed: false }});
    });
  }

  onChange(field, value) {
    const item = Object.assign({}, this.state.item);
    item[field] = value;

    this.setState({ item });
  }

  handleComplete(id) {
    return () => {
      const i = this.state.items.findIndex((item) => item._id === id);
      const item = this.state.items[i];
      const options = {
        method: 'PUT',
        body: JSON.stringify({ completed: !item.completed }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch(`/api/${item._id}`, options).then(() => {
        const items = new Array(...this.state.items);
        items[i].completed = !items[i].completed;
        this.setState({items});
      });
    };
  }

  render() {
    return (
      <div className="cf pa4">
        <div className="fl w-50">
          { this.state.loading && <div>Loading Your Todos...</div> }
          { !this.state.loading && <ItemList items={this.state.items} handleComplete={this.handleCompleteBind} />}
        </div>
        <div className="fl w-50">
          <CreateItem onSubmit={this.onSubmitBind} item={this.state.item} onChange={this.onChangeBind} />
        </div>
      </div>
    );
  }
}

export default ToDoList;
