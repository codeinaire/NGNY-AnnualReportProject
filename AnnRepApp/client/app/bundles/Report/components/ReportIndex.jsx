import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { BlockPicker,
         ChromePicker,
         CirclePicker,
         CompactPicker,
         GithubPicker,
         HuePicker,
         MaterialPicker,
         PhotoshopPicker,
         SketchPicker,
         SliderPicker,
         SwatchesPicker,
         TwitterPicker, } from 'react-color';


const Header = styled.header.attrs({
  backgroundcolor: props => props.backgroundcolor || `palevioletred`,
})`
  background-color: ${props => props.backgroundcolor};
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
      parts: [],
      name: this.props.name,
      report: {},
      displayHeadColorPicker: false,
      displayFootColorPicker: false,
    };

    this.updateHeadColour = this.updateHeadColour.bind(this);
    this.updateFootColour = this.updateFootColour.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  };

  // colour slider
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

  // api
  componentDidMount() {
    this.getReports();
  }

  getReports() {
    $.getJSON('/users/1/reports/1.json', (response) => {
      console.log("this is response", response);
      this.setState({
         report: response
       })
       console.log("this is an attribute for report", this.state.report.header_colour);
     });
  }

  handleUpdate() {

    $.ajax({
      url: `/users/1/reports/1`,
      type: 'PUT',
      data: { report: this.state.report },
      success: () => {
        console.log('you did it');
        // this.updateReports(report);
        // callback to swap objects
      }
    });
 };

  updateName = (name) => {
    this.setState({ name });
  };

  // update report object from form input
  // updateObject(event) {
  //   event.preventDefault();
  //   console.log('Just checking it workin! 🎣');
  //   console.log(this.backgroundcolor.value);
  //   console.log(this.backgroundcolor);
  //   console.log("this is event", event);
  //   this.setState({ report: { header_colour: this.backgroundcolor.value }});
  //   this.resetForm.reset();
  // };

  updateHeadColour(color, event) {
    // event.preventDefault();
    console.log('In head 🎣');
    console.log("event", event);
    console.log("event.hex", event.hex);
    // let colour = event.hex;
    // console.log(this.backgroundcolor.value);
    this.setState({ report: { header_colour: color.hex}});
    // this.resetForm.reset();
  };

  updateFootColour(foot, event) {
    // event.preventDefault();
    console.log('IN foot 🎣');
    console.log("event in foot", event);
    console.log("event.hex in foot", event.hex);
    console.log("color", foot);
    // let colour = event.hex;
    // console.log(this.backgroundcolor.value);
    this.setState({ report: { footer_colour: foot.hex}});
    // this.resetForm.reset();
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

        <h3>
          Hello, {this.state.name}!
        </h3>
        <div>
          <h2>Please Enter a Colour</h2>
          <form ref={(input) => this.resetForm = input} onSubmit={(e) => this.updateObject(e)}>
             <input ref={(input) => this.backgroundcolor = input} type="text" placeholder="Enter Colour" />
             <button type="submit">+ Add Item</button>
         </form>
        </div>
        <hr />
          {this.state.parts.map((report, i) => <div key={i}><p>{report.title}</p><p>{report.header_colour}</p><p>{report.footer_colour}</p></div>)}
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
        <Footer backgroundcolor={this.state.report.footer_colour}>This is a footer
          <button onClick={() => this.handleClick("foot") }>Pick Color</button>
          { this.state.displayFootColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={() => this.handleClose("foot") }/>
            <ChromePicker color={this.state.report.footer_colour} onChangeComplete={ this.updateFootColour } />
          </div> : null }
        </Footer>
        <button type="submit" onClick={this.handleUpdate}>Click to Save Changes</button>
      </div>
    );
  }
}
