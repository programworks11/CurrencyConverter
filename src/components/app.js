import React, {Component} from 'react';
import AppContainer from '../containers/app_container';

export default class App extends Component
{
  render()
  {
    return (<div>
                <AppContainer />
                <AppContainer />
                <AppContainer />
            </div>);
  }
}
