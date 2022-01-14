import React, { Component } from 'react';

import './Form.css';

const inputs = {
  firstName: {
    defaultValue: '',
    format: 'email',
  },
};

class Form extends Component {
  state = {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };

  handleInputChange = (e, name) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: e.target.value,
      },
    });
  };

  validateForm = () => {
    for (let i = 0; i < formInputs.length; i++) {
      const inputName = formInputs[i];

      if (!this.state.form[inputName].length) {
        return false;
      }
    }

    return true;
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      console.log('Success!');
    } else {
      console.log('Failure!');
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          className='Form'
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          {inputList.map((val, index) => {
            <input
              key={index}
              style={{ marginLeft: '10px' }}
              name={val}
              onChange={(e) => this.handleInputChange(e, val)}
            />;
          })}
          <button className='no-padding'>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
