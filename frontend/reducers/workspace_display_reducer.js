import {
  WORKSPACE_REQUEST,
  CREATE_WORKSPACE_RECEIVE
} from '../actions/workspace_actions';
import { CHANNEL_REQUEST } from '../actions/channel_actions';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_WORKSPACE_RECEIVE :
      return action.workspace.slug;
    case WORKSPACE_REQUEST :
      return action.workspaceSlug;
    case CHANNEL_REQUEST :
      return action.workspaceSlug;
    default :
      return state;
  }
};

export default workspaceDisplayReducer;