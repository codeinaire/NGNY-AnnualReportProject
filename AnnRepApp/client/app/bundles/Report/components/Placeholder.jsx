import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../components/Menu';
import Display from '../components/Display';

export default class Placeholder extends React.Component {
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
      part: '',
      section: ''
    };
    this.indexSectionShow = this.indexSectionShow.bind(this);
  }

  indexSectionShow(section, part) {
    this.updateSection(section, part);
  };

  updateSection(section, part) {
    this.setState({ section: section, part: part })
    console.log(section)
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Menu user={this.props.user}
                report={this.props.report}
                parts={this.props.parts}
                indexSectionShow={this.indexSectionShow}/>
        </div>
        <div className="display">
          <Display user={this.props.user}
                  report={this.props.report}
                  part={this.state.part}
                  section={this.state.section}/>
        </div>
      </div>
    )
  }
}
