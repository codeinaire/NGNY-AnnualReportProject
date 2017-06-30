import PropTypes from 'prop-types';
import React from 'react';

export default class Display extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      user: this.props.user,
      report: this.props.report,
      parts: this.props.parts,
    }
  }

  render() {
    return (
      <div>
        <h4>{this.props.section.title}</h4>
      </div>
    )
  }
}
