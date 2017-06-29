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
      user: this.props.user,
      report: this.props.report
    }
  };
   //
  //  partClick() {
  //    this.props.handleDelete();
  //  }

  handleEdit() {
   if (this.state.editable) {
    var id = this.props.part.id;
    var title = this.state.title;
    var part = { id: id, title: title };
    this.props.handleUpdate(part, this.state.user, this.state.report);
   }
    this.setState({ editable: !this.state.editable })
  }

  handleDelete(){
    $.ajax({
    url: `/users/${this.state.user.id}/reports/${this.state.report.id}/parts/${this.props.part.id}`,
    type: 'DELETE',
    success: (response) => {
      console.log('successfully removed part', response);
      this.props.getParts();
    }
    });
  }

  render() {
    let partTitle = this.state.editable ? <input type='text'
                                                 defaultValue={this.props.part.title}
                                                 onChange={ (e) => this.setState({ title: e.target.value }) }/>
                                        : <p>{this.props.part.title} {this.props.part.id}</p>
    return (
      <div>
        <h4>{partTitle}</h4>
        <button onClick={() => this.handleDelete()}>Delete</button>
        <button onClick={() => this.handleEdit()}>{this.state.editable ? 'Submit' : 'Edit' }</button>
      </div>
    )
  }
}
