import React, { Component } from 'react';

class GreetingComponent extends Component {
  state = {
    name: 'dev',
  };

  render() {
    return (
      <div>
        <p>Hello, {this.state.name}!</p>
      </div>
    );
  }
}

export default GreetingComponent;
