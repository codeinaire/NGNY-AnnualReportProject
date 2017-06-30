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
       parts: []
     };
     this.passSectionShow = this.passSectionShow.bind(this);
   }

   componentDidMount() {
     this.getParts();
   }

   getParts() {
     $.getJSON(`/users/${this.state.user.id}/reports/${this.state.report.id}/parts.json`, (response) => { this.setState({ parts: response }) });
   }

   sortParts() {
     this.state.parts.sort(function(a, b) {
       return a.id - b.id;
     });
   }

  handleUpdate(part, user, report) {
    console.log(part);
    $.ajax({
      url: `/users/${user.id}/reports/${report.id}/parts/${part.id}`,
      type: 'PUT',
      data: { part: part },
      success: () => {
        this.getParts();
      }
    });
  };

  passSectionShow(section) {
    this.props.indexSectionShow(section);
  }

  render() {
    this.sortParts()
    return (
      <div>
        <h1>Menu</h1>
        {this.state.parts.map((part, i) =>
        <div key={i}>
          <Part part={part}
                user={this.state.user}
                report={this.state.report}
                handleUpdate={this.handleUpdate}
                getParts={() => this.getParts()}
                passSectionShow={this.passSectionShow}/>
        </div>)}
        <div className="newPartDiv">
          <NewPart user={this.state.user}
                   report={this.state.report}
                   getParts={() => this.getParts()}/>
        </div>
      </div>
    )
  }
}
