import React, {Component} from 'react';
import AppContainer from '../containers/app_container';
/*
 wrapper component
*/
export default class App extends Component
{
  render()
  {
    return (<div>
              <div style={{float:"left", border:"1px solid black", padding:"20px 20px 20px 20px", margin:"10px 10px 10px 10px"}} >
                <AppContainer />
              </div>
              <div style={{float:"left", border:"1px solid black", padding:"20px 20px 20px 20px", margin:"10px 10px 10px 10px"}} >
                <AppContainer />
              </div>
              <div style={{float:"left", border:"1px solid black", padding:"20px 20px 20px 20px", margin:"10px 10px 10px 10px"}} >
                <AppContainer />
              </div>
            </div>);
  }
}
