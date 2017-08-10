import React, { Component } from 'react';

export const clickOutside = Comp => class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedOutside: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true);
  }

  componentDidUpdate() {
    this.state = { clickedOutside: false };
  }

  handle = (e) => {
    const el = this.container;
    if (!el.contains(e.target)) this.setState({ clickedOutside: true });
  };

  render() {
    const { clickedOutside } = this.state;
    const getRef = el => this.container = el;

    return (
      <div ref={getRef}>
        <Comp {...{ ...this.props, clickedOutside }} />
      </div>
    );
  }
};
