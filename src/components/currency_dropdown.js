import React, {Component} from 'react';
import {returnCurrencies} from '../reducers/reducer_currency';
/*
Component for currency drop down
*/
export default class CurrencyDropDown extends Component
{
  constructor(props)
  {
    super(props);
  }
  renderCurrencies(curr)
  {
    return (<option key={curr} value={curr}>{curr}</option>);
  }
  render()
  {
    if(!this.props.currencies)
    {
      return (<div></div>);
    }
    let currencyList = returnCurrencies(this.props.currencies);

    return (<div className="slds-form-element slds-m-left--medium">
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select className="slds-select slds-theme--shade currency-dropdown-width" value={this.props.initValue} onChange={this.props.selectCurrency} id="select-01">{currencyList.map(this.renderCurrencies)}</select>
                </div>
              </div>
            </div>);
  }
}
