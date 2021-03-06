import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import entitiesReducer from './entitiesReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  errors: errorsReducer
});

export default rootReducer;
