import PropTypes from 'prop-types';
import React from 'react';
import Part from '../components/Part';
import NewPart from '../components/NewPart';

export default class Menu extends React.Component {
   /**
    * @param props - Comes from your rails view.
    * @param _railsContext - Comes from React on Rails
    */
   constructor(props, _railsContext) {
     super(props);
     this.state = {
       user: this.props.user,
       report: this.props.report,
       parts: [],
     }
   }

   componentDidMount() {
     this.getParts();
   }

   getParts() {
     $.getJSON(`/users/${this.state.user.id}/reports/${this.state.report.id}/parts.json`, (response) => { this.setState({ parts: response }) });
   }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        {this.state.parts.map((part, i) =>
        <div key={i}>
          <Part part={part} />
        </div>)}
        <NewPart user={this.state.user}
                 report={this.state.report}
                 getParts={() => this.getParts()}/>
      </div>
    )
  }
}
