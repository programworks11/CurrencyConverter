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

    return (<select value={this.props.initValue} onChange={this.props.selectCurrency}>{currencyList.map(this.renderCurrencies)}</select>);
  }
}
