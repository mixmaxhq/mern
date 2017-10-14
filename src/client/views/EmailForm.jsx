import React from 'react';
import PropTypes from 'prop-types';

class EmailForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: ''
    };

    this.onSubmitBind = this.onSubmit.bind(this);
    this.onChangeBind = this.onChange.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  }

  onSubmit() {
    this.props.onSubmit(this.state.email);
  }

  render() {
    return (
      <div>
        <div className="f4 bold mw6">Send these:</div>
        <div className="ma3">
          <div className="f5 fw6 ph0 mh0">To (email):</div>
          <input type='text' value={this.state.email} onChange={this.onChangeBind} />
        </div>
        <div className='pointer link dim br2 ph3 pv2  ma3 mb2 dib white bg-black' onClick={this.onSubmitBind}>Send.</div>
      </div>
    );
  }
}

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default EmailForm;
