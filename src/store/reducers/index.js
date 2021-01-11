import { combineReducers } from 'redux';

import remindersReducer from './reminders';
import countriesReducer from './countries';

const rootReducer = combineReducers({
    reminders: remindersReducer,
    countries: countriesReducer
});

export default rootReducer;