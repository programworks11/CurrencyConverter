import {ACTION_TYPES} from '../actions/index';
import _ from 'lodash';

export default function(state=null, action)
{
  try
  {
      switch (action.type)
      {
        case ACTION_TYPES.LATEST_CURRENCIES:
            action.payload.data.rates['EUR']=1;
            //console.log("rates ", action.payload.data.rates);
            return action.payload.data.rates;
      }
   }
   catch(e)
   {
     console.log("exception ",e);
     return e;
   }
   finally
   {

   }
   return state;
}

export function returnCurrencies(currenciesResult)
{
  let currenciesArray = []
  _.forEach(currenciesResult,function(value, key)
                              {
                                if(key == 'USD' || key == 'CAD' || key=='EUR')
                                   {
                                      currenciesArray = [...currenciesArray, key]
                                   }
                              });
  return currenciesArray;
}
