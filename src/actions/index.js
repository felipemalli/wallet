import { WALLET_INFO, WALLET_DELETE, COINS_ARRAY } from '../reducers/wallet';
import { USER_INFO } from '../reducers/user';
import getCurrencies from '../services/currenciesAPI';

export const updateLogin = (value) => ({ type: USER_INFO, value });

function addCurrenciesToExpenses(value) {
  return { type: WALLET_INFO, value };
}

export const updateExpenses = (value) => (dispatch) => {
  getCurrencies()
    .then((actualCurrencies) => {
      const updatedValue = value;
      updatedValue.exchangeRates = actualCurrencies;
      dispatch(addCurrenciesToExpenses(updatedValue));
    });
};

export const deleteExpense = (value) => ({ type: WALLET_DELETE, value });

function addCoins(value) {
  return { type: COINS_ARRAY, value };
}

export const updateCoins = () => (dispatch) => {
  getCurrencies()
    .then((data) => {
      const coins = Object.keys(data)
        .filter((eachOne) => eachOne !== 'USDT');
      dispatch(addCoins(coins));
    });
};
