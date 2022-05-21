export const WALLET_INFO = 'WALLET_INFO';
export const WALLET_DELETE = 'WALLET_DELETE';
export const COINS_ARRAY = 'COINS_ARRAY';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WALLET_INFO:
      return {
        ...state,
        currencies: [...state.currencies],
        expenses: [
          ...state.expenses, action.value,
        ],
      };
    case WALLET_DELETE:
      return {
        ...state,
        currencies: [...state.currencies],
        expenses: [...action.value],
      };
    case COINS_ARRAY:
      return {
        ...state,
        currencies: [...action.value],
      };
    default:
      return state;
  }
};

export default walletInfoReducer;
