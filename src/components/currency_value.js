import React, {Component} from 'react';

/*
 Component for currency text
*/
export default class CurrencyValue extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (<div className="slds-form-element">
              <div className="slds-form-element__control">
                <input placeholder="0.00" className="slds-input" value ={this.props.value} onChange={this.props.currencyValueChanged} />
              </div>
            </div>);
  }
}
