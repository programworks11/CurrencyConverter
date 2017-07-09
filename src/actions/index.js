import axios from 'axios';

export const ACTION_TYPES = {CONVERT_CURRENCY: 'CONVERT_CURRENCY',
                             LATEST_CURRENCIES:'LATEST_CURRENCIES'};

const FIXER_API_BASE_URL = "http://api.fixer.io/latest?base=EUR";

export function getLatestCurrencies()
{
    const request = axios.get(FIXER_API_BASE_URL);
    //console.log('request', request);
    return {type:ACTION_TYPES.LATEST_CURRENCIES, payload: request}
}
