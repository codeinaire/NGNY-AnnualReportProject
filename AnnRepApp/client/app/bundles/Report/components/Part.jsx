import PropTypes from 'prop-types';
import React from 'react';

export default class Part extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      editable: false,
      title: '',
      headerColour: ''
    }
  };

  render() {
    return (
      <h3>{this.props.part.title}</h3>
    )
  }
}
