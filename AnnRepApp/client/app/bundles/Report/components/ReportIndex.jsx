import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';


// styled-components: used to change the styling of the page, user input directly changes this.
const Header = styled.header.attrs({
  backgroundcolor: props => props.backgroundcolor || `palevioletred`,
})`
  background-color: ${props => props.backgroundcolor};
  width: 100%;
  height: 100px;
`;

const Footer = styled.footer.attrs({
  backgroundcolor: props => props.backgroundcolor || `red`,
})`
  background-color: ${props => props.backgroundcolor};
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
      parts: [],
      name: this.props.name,
      report: {},
      currentUser: this.props.currentUser,
      displayHeadColorPicker: false,
      displayFootColorPicker: false,
    };

    this.updateHeadColour = this.updateHeadColour.bind(this);
    this.updateFootColour = this.updateFootColour.bind(this);
    this.handleCreateNew = this.handleCreateNew.bind(this);
    this.showState = this.showState.bind(this);
  };

  showState = () => {
    console.log("This is report", this.state.report);
  };

  // colour picker open and close
  handleClick = (arg) => {
    console.log("this is arg in handleclick", arg);
    if ( arg == "head") {
      this.setState({ displayHeadColorPicker: !this.state.displayHeadColorPicker })
    } else if ( arg == "foot")  {
      this.setState({ displayFootColorPicker: !this.state.displayFootColorPicker })
      };
  };

  handleClose = (arg) => {
    console.log("this is arg in handleclick", arg);
    if ( arg == "head" ) {
      this.setState({ displayHeadColorPicker: false })
    } else if ( arg == "foot" ) {
      this.setState({ displayFootColorPicker: false })
    };
  };

  // update colour of header and footer
  // NOTE fix conflict between footer changing header colour
  updateHeadColour(color, event) {
    this.setState({
      report: {
        header_colour: color.hex
      }
    });
  };

  updateFootColour(foot, event) {
    this.setState({ report: { footer_colour: foot.hex}});
  };

  // api to rails
  // componentDidMount() {
  //   this.getReports();
  //  CREATE DEFAULT STATE WHEN COMPONENT MOUNTS
  // }

  // NOTE - when a user creates a new report are we going to get the styling from
  // the database or are we going to have the state determine the default styling.
  getReports() {
    $.getJSON(`/users/${this.state.currentUser}/reports/1.json`, (response) => {
      console.log("this is response", response);
      this.setState({
         report: response
       })
     });
  }

  handleCreateNew() {
    console.log("this is report in new", this.state.report);
    let report = this.state;
    $.ajax({
      url: `/users/${this.state.currentUser}/reports`,
      type: 'POST',
      data: { report: { id: null,
                        title: report.title,
                        header_colour: report.header_colour,
                        footer_colour: report.footer_colour,
                        footer_date: report.footer_date,
                        footer_company: report.footer_date,
                        user_id: report.user_id }
            },
      success: () => {
        console.log('you did it');
      }
    });
 };

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    return (
      <div>
        <Header backgroundcolor={this.state.report.header_colour}>This is a header
          <button onClick={ () => this.handleClick("head") }>Pick Color</button>
          { this.state.displayHeadColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ () => this.handleClose("head") }/>
            <ChromePicker color={this.state.report.header_colour} onChangeComplete={ this.updateHeadColour } />
          </div> : null }
        </Header>



        <Footer backgroundcolor={this.state.report.footer_colour}>This is a footer
          <button onClick={() => this.handleClick("foot") }>Pick Color</button>
          { this.state.displayFootColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={() => this.handleClose("foot") }/>
            <ChromePicker color={this.state.report.footer_colour} onChangeComplete={ this.updateFootColour } />
          </div> : null }
        </Footer>
        <button type="submit" onClick={this.showState}>STATE ME!!</button>
        <button type="submit" onClick={this.handleCreateNew}>Click to Save Changes</button>
      </div>
    );
  }
}
