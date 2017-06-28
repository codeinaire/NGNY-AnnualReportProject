import PropTypes from 'prop-types';
import React from 'react';
import Part from '../components/Part';

export default class Menu extends React.Component {
   /**
    * @param props - Comes from your rails view.
    * @param _railsContext - Comes from React on Rails
    */
   constructor(props, _railsContext) {
     super(props);
     this.state = {
       user: this.props.user,
       reports: [],
       report: this.props.report,
       parts: this.props.parts
     }
   }

//    componentDidMount() {
//   this.getReports();
// }

   getReports() {
  $.getJSON(`/users/${this.state.user.id}/reports.json`, (response) => { this.setState({ reports: response }) });
}

  render() {
    return (
      <div>
        <h1>Menu</h1>
        {this.state.parts.map((part, i) =>
        <div key={i}>
          <Part part={part} />
        </div>)}
      </div>

    )
  }
}
