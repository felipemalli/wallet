import { combineReducers } from 'redux';
import userInfoReducer from './user';
import walletInfoReducer from './wallet';

const rootReducer = combineReducers({ user: userInfoReducer, wallet: walletInfoReducer });

export default rootReducer;
