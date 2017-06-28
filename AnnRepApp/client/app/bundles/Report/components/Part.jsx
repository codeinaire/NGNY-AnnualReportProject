import PropTypes from 'prop-types';
import React from 'react';

export default class Part extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */

   partClick() {
     this.props.handleDelete();
     this.props.getParts();
   }

  render() {
    return (
      <div>
        <h4>{this.props.part.title}</h4>
        <button onClick={() => this.partClick()}>
         Delete
       </button>
      </div>
    )
  }
}
