import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background-color: palevioletred;
  width: 100%;
  height: 100px;
`;

const Footer = styled.footer`
  background-color: palevioletred;
  width: 100%;
  height: 100px;
`;


export default class ReportIndex extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
      reports: [],
      name: this.props.name,
    };
  };


  componentDidMount() {
    this.getReports();
  }

  getReports() {
    $.getJSON('/users/1/reports.json', (response) => {
      console.log("this is response", response);
      this.setState({
         reports: response
       })
     });
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <Header>This is a header</Header>

        <h3>
          Hello, {this.state.name}!
        </h3>
        <h2>Will work!</h2>
        <hr />
          {this.state.reports.map((report, i) => <div key={i}><p>{report.title}</p><p>{report.header_colour}</p><p>{report.footer_colour}</p></div>)}
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
        <Footer>This is a footer</Footer>
      </div>
    );
  }
}
