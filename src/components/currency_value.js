import React, {Component} from 'react';

export default class CurrencyValue extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (<input value ={this.props.value} onChange={this.props.currencyValueChanged} />);
  }
}
