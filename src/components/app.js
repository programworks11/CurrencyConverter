import React, {Component} from 'react';
import AppContainer from '../containers/app_container';
import './../style.scss';
/*
 wrapper component
*/
export default class App extends Component
{
  render()
  {
    return (<div>
              <div className="app-container">
                <AppContainer />
              </div>
              <div className="app-container">
                <AppContainer />
              </div>
              <div className="app-container">
                <AppContainer />
              </div>
            </div>);
  }
}
