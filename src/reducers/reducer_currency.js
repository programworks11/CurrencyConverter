import {ACTION_TYPES} from '../actions/index';
import _ from 'lodash';


// handles the action returned by action creator
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
/*
  filters only the currencies needed. Right now it filters to 3 currencies CAD, EUR, USD
*/
export function returnCurrencies(currenciesResult)
{
  let currenciesArray = []
  _.forEach(currenciesResult,function(value, key)
                              {
                                //currenciesArray = [...currenciesArray, key]
                                if(key == 'USD' || key == 'CAD' || key=='EUR')
                                   {
                                      currenciesArray = [...currenciesArray, key]
                                   }
                              });
  return currenciesArray;
}
