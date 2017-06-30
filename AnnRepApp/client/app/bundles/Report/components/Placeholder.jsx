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
      parts: this.props.parts
    }
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Menu user={this.props.user}
                report={this.props.report}
                parts={this.props.parts}/>
        </div>
        <div className="display">
          <Display user={this.props.user}
                  report={this.props.report}
                  parts={this.props.parts}/>
        </div>
      </div>
    )
  }
}
