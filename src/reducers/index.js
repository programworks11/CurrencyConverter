import { combineReducers } from 'redux';
import CurrencyReducer from './reducer_currency';

const rootReducer = combineReducers({
  currencies: CurrencyReducer
});

export default rootReducer;
