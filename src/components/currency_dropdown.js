import React, {Component} from 'react';
import {returnCurrencies} from '../reducers/reducer_currency';

export default class CurrencyDropDown extends Component
{
  constructor(props)
  {
    super(props);
    //console.log("props",props);
  }
  renderCurrencies(curr)
  {
    //console.log("Curr ", curr);
    return (<option key={curr} value={curr}>{curr}</option>);
  }
  render()
  {
    if(!this.props.currencies)
    {
      return (<div></div>);
    }
    let currencyList = returnCurrencies(this.props.currencies);

    return (<div className="slds-form-element">
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select className="slds-select" value={this.props.initValue} onChange={this.props.selectCurrency} id="select-01">{currencyList.map(this.renderCurrencies)}</select>
                </div>
              </div>
            </div>);
  }
}
