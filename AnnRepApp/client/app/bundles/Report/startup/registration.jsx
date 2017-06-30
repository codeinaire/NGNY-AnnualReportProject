import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';

import Menu from '../components/Menu';

import Part from '../components/Part';

import NewPart from '../components/NewPart';

import Display from '../components/Display';

import Section from '../components/Section';

import NewSection from '../components/NewSection';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Menu,
  Part,
  NewPart,
  Display,
  Section,
  NewSection
});
