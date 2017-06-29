import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';

import ReportIndex from '../components/ReportIndex';

import Header from '../components/Header';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  ReportIndex,
  Header,
});
