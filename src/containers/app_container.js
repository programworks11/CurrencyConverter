import React, { Component } from 'react';
import CurrencyDropDown from '../components/currency_dropdown';
import CurrencyValue from '../components/currency_value';
import {connect} from 'react-redux';
import {getLatestCurrencies} from '../actions/index';
import {bindActionCreators} from 'redux';
import _ from 'lodash';


/*
This component is container component which has access to state of the application
*/
class AppContainer extends Component
{
  constructor(props)
  {
    super(props);
    this.state={inputCurrency:'AUD', outputCurrency:'USD', inputCurrencyValue:'', outputCurrencyValue:'', showDisclaimer:false};
    this.selectedInputCurrency=this.selectedInputCurrency.bind(this);
    this.selectedOutputCurrency=this.selectedOutputCurrency.bind(this);
    this.selectedInputCurrencyValueChanged=this.selectedInputCurrencyValueChanged.bind(this);
    this.calculateTargetValue=this.calculateTargetValue.bind(this);
    this.showDisclaimer = this.showDisclaimer.bind(this);
  }
  componentDidMount()
  {
      this.props.getLatestCurrencies();
  }

  render()
  {
    if(this.props.currencies && this.props.currencies instanceof TypeError)
    {
      console.log("Error from CurrencyDropDown component", this.props.currencies);
      return (<div>Please try after sometime.</div>);
    }
    return (<div>
             <div className="slds-float_left">
              <div className="slds-p-around_medium">
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--medium">
                  <h3>Currency converter</h3>
                </div>
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--small slds-m-bottom--small slds-m-top--small">
                  Type in amount and select currency:
                </div>
                <div className="slds-grid slds-grid_vertical-align-start">
                  <CurrencyValue value={this.state.inputCurrencyValue} currencyValueChanged={this.selectedInputCurrencyValueChanged}/>
                  <CurrencyDropDown initValue={this.state.inputCurrency} currencies={this.props.currencies} selectCurrency={this.selectedInputCurrency}/>
                </div>
                <div className="slds-grid slds-grid_vertical-align-start slds-text-heading--small slds-m-bottom--small slds-m-top--small">
                  Converted amount:
                </div>
                <div className="slds-grid slds-grid_vertical-align-start">
                  <CurrencyValue value={this.calculateTargetValue()} />
                  <CurrencyDropDown initValue={this.state.outputCurrency} currencies={this.props.currencies} selectCurrency={this.selectedOutputCurrency}/>
                </div>
                <div style={{color:"blue"}} onClick={this.showDisclaimer}>
                  <u className="slds-float--right">Disclaimer</u>
                </div>
                <div ref="disclaimer" className="disclaimer-hidden">
                  Refer api.fixer.io for more details.
                </div>
              </div>
             </div>
            </div>);
  }
  /*
    toggles between css classes for hiding and showing disclaimer
  */
  showDisclaimer(event)
  {
    this.state.showDisclaimer=!this.state.showDisclaimer;
    this.refs.disclaimer.className = this.state.showDisclaimer ? 'disclaimer-visible':'disclaimer-hidden';
  }
  selectedInputCurrency(event)
  {
      //console.log("selectedInputCurrency", event.target.value);
      this.setState({inputCurrency:event.target.value});
      console.log(this.state);
  }
  selectedOutputCurrency(event)
  {
      //console.log("selectedOutputCurrency", event.target.value);
      this.setState({outputCurrency:event.target.value});
      console.log(this.state);
  }
  /*
  this method removes any special characters from input text field and adds 0. for decimals entered with . as starting character
  */
  selectedInputCurrencyValueChanged(event)
  {
      let inputTexts = event.target.value;
      // converting input string to array of characters
      const inputArray = Array.from(inputTexts);
      // using lodash forEach method to iterate character array
      _.forEach(inputArray, function(value)
                            {
                              //console.log("reg ex result", value.match(/([0-9]|[.])/ ));
                              //Add only 0 to 9 and . characters to final string
                              if(!value.match(/([0-9]|[.])/))
                              {
                                //console.log("Replacing", value);
                                inputTexts = inputTexts.replace(value,'');
                              }
                            }
                );
      // Replace all . with |
      inputTexts = inputTexts.replace(/\./g, '|');
      // Replace first | with .
      inputTexts = inputTexts.replace(/\|/, '.');
      // Replace all | with ""
      inputTexts = inputTexts.replace(/\|/g,"");
      //prepend with 0 if final string text is .
      if("." == inputTexts)
      {
        inputTexts ="0.";
      }
      this.setState({inputCurrencyValue:inputTexts});
  }
  /*
  calculates the value of output text
  */
  calculateTargetValue()
  {
    //console.log("calculate target value", this.state);
    if(!this.state.inputCurrencyValue || !this.state.inputCurrency || !this.state.outputCurrency || !this.props.currencies)
    {
      return '';
    }
    //console.log("nominator1", this.state.outputCurrency);
    //console.log("nominator1", this.props.currencies);
    const nominator1 = this.props.currencies[this.state.outputCurrency];
    const nominator = this.state.inputCurrencyValue * nominator1;
    const denominator = this.props.currencies[this.state.inputCurrency]
    //console.log("exchange value", nominator/denominator);
    return _.round(nominator/denominator, 2);
  }
}
function mapStateToProps({currencies, currencyValue})
{
  //console.log("Exchange rates", currencyValue);
  return {currencies: currencies};
}
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({getLatestCurrencies:getLatestCurrencies}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
