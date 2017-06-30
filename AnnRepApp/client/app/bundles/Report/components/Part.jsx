import PropTypes from 'prop-types';
import React from 'react';
import Section from '../components/Section';
import NewSection from '../components/NewSection';

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
      report: this.props.report,
      sections: []
    }
  };

  componentDidMount() {
    this.getSections();
  }

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

  getSections() {
    $.getJSON(`/users/${this.state.user.id}/reports/${this.state.report.id}/sections.json`, (response) => { this.setState({ sections: response }) });
  }

  sectionUpdate(section, user, report) {
    console.log(section);
    $.ajax({
      url: `/users/${user.id}/reports/${report.id}/sections/${section.id}`,
      type: 'PUT',
      data: { section: section },
      success: () => {
        this.getSections();
      }
    });
  };

  sectionShow(section) {
    this.props.passSectionShow(section);
  }

  sortSections() {
    this.state.sections.sort(function(a, b) {
      return a.id - b.id;
    });
  }

  render() {
    this.sortSections()
    let partTitle = this.state.editable ? <div><input type='text'
                                                 defaultValue={this.props.part.title}
                                                 onChange={ (e) => this.setState({ title: e.target.value }) }/> <p className="editButton" onClick={() => this.handleEdit()}>Save</p></div>
                                        : <p>{this.props.part.title} <span className="deleteButton" onClick={() => this.handleDelete()}>X</span> <span className="editButton" onClick={() => this.handleEdit()}>-></span></p>
    return (
      <div>
        <h4>{partTitle}</h4>
        {/* <button onClick={() => this.handleDelete()}>Delete</button> */}
        {/* <button onClick={() => this.handleEdit()}>{this.state.editable ? 'Submit' : 'Edit' }</button> */}
        <div className="menuSection">
          <ul>
            {this.state.sections.map((section, i) =>
              section.part_id == this.props.part.id &&
            <li key={i} onClick={() => this.sectionShow(section)}>
              <Section section={section}
                       part={this.props.part}
                       user={this.state.user}
                       report={this.state.report}
                       getSections={() => this.getSections()}
                       sectionUpdate={this.sectionUpdate}/>
            </li>)}
          </ul>
        </div>
           <NewSection part={this.props.part}
                       user={this.state.user}
                       report={this.state.report}
                       getSections={() => this.getSections()} />
        <hr />
      </div>
    )
  }
}
