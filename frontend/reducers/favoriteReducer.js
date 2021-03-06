import merge from 'lodash.merge';
import {
  FAVORITES_RECEIVE,
  CREATE_FAVORITE_RECEIVE,
  DELETE_FAVORITE_RECEIVE,
} from '../actions/favoriteActions';
import { CHANNEL_RECEIVE } from '../actions/channelActions';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FAVORITES_RECEIVE : {
      const { favorites } = action;
      nextState = {};

      favorites.map(fav => {
        nextState[fav.messageSlug] = fav;
      });

      return Object.assign({}, state, nextState);
    }
    case CREATE_FAVORITE_RECEIVE : {
      const { favorite } = action;
      nextState = { [favorite.messageSlug]: favorite };

      return Object.assign({}, state, nextState);
    }
    case DELETE_FAVORITE_RECEIVE : {
      const { favorite } = action;
      nextState = Object.assign({}, state);
      delete nextState[favorite.messageSlug];
      
      return nextState;
    }
    case CHANNEL_RECEIVE :
      const { channel: { favorites }, ui: { messageSlug, userId } } = action;
      let prevState = Object.assign({}, state);
      nextState = {};

      Object.values(prevState).map(fav => {
        if (fav.messageSlug === messageSlug) {
          nextState[fav.messageSlug] = fav;
        }

        if (fav.userId === userId) {
          nextState[fav.messageSlug] = fav;
        }
      });

      favorites.map(fav => {
        nextState[fav.messageSlug] = fav;
      });

      return nextState;
    default :
      return state;
  }
};

export default favoriteReducer;