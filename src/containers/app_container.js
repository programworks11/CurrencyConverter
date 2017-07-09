import React, { Component } from 'react';
import CurrencyDropDown from '../components/currency_dropdown';
import CurrencyValue from '../components/currency_value';
import {connect} from 'react-redux';
import {getLatestCurrencies} from '../actions/index';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class AppContainer extends Component
{
  constructor(props)
  {
    super(props);
    this.state={inputCurrency:'AUD', outputCurrency:'AUD', inputCurrencyValue:0, outputCurrencyValue:0};
    this.selectedInputCurrency=this.selectedInputCurrency.bind(this);
    this.selectedOutputCurrency=this.selectedOutputCurrency.bind(this);
    this.selectedInputCurrencyValueChanged=this.selectedInputCurrencyValueChanged.bind(this);
    this.selectedOutputCurrencyValueChanged=this.selectedOutputCurrencyValueChanged.bind(this);
    this.calculateTargetValue=this.calculateTargetValue.bind(this);
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
      <table>
            <thead>
              <tr>
                <td>
                  <h3>Currency converter</h3>
                </td>
              </tr>
            </thead>
            <tbody>
                <tr><td>Type in amount and select currency:</td></tr>
                <tr>
                  <td>
                    <CurrencyValue value={this.state.inputCurrencyValue} currencyValueChanged={this.selectedInputCurrencyValueChanged}/>
                  </td>
                  <td>
                    <CurrencyDropDown initValue={this.state.inputCurrency} currencies={this.props.currencies} selectCurrency={this.selectedInputCurrency}/>
                  </td>
                </tr>
                <tr><td>Converted amount:</td></tr>
                <tr>
                  <td>
                    <CurrencyValue value={this.calculateTargetValue()} currencyValueChanged={this.selectedOutputCurrencyValueChanged}/>
                  </td>
                  <td>
                    <CurrencyDropDown initValue={this.state.outputCurrency} currencies={this.props.currencies} selectCurrency={this.selectedOutputCurrency}/>
                  </td>
                </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                    <a href="http://fixer.io" style={{float:"right", color:"blue"}}>Disclaimer</a>
                </td>
              </tr>
            </tfoot>
        </table>
        </div>
    );
  }
  showDisclaimer()
  {
      console.log("Show Disclaimer...");
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
  selectedInputCurrencyValueChanged(event)
  {
      let inputTexts = event.target.value;
      const inputArray = Array.from(inputTexts);
      _.forEach(inputArray, function(value)
                            {
                              console.log("inside *** function", value);
                              console.log("reg ex result", value.match(/([0-9]|[.])/ ));
                              if(!value.match(/([0-9]|[.])/))
                              {
                                console.log("Replacing", value);
                                inputTexts = inputTexts.replace(value,'');
                              }
                            }
                );
      inputTexts = inputTexts.replace(/\./g, '|');
      inputTexts = inputTexts.replace(/\|/, '.');
      inputTexts = inputTexts.replace(/\|/g,"");
      if("." == inputTexts)
      {
        inputTexts ="0.";
      }
      this.setState({inputCurrencyValue:inputTexts});
  }
  selectedOutputCurrencyValueChanged(event)
  {
  }
  calculateTargetValue()
  {
    //console.log("calculate target value", this.state);
    if(!this.state.inputCurrencyValue || !this.state.inputCurrency || !this.state.outputCurrency || !this.props.currencies)
    {
      return 0;
    }
    //console.log("nominator1", this.state.outputCurrency);
    //console.log("nominator1", this.props.currencies);
    const nominator1 = this.props.currencies[this.state.outputCurrency];
    const nominator = this.state.inputCurrencyValue * nominator1;
    const denominator = this.props.currencies[this.state.inputCurrency]
    //console.log("exchange value", nominator/denominator);
    return nominator/denominator;
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
