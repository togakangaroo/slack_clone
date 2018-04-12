import {
  all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as workspaceActions from '../actions/workspace_actions';
import * as subActions from '../actions/workspace_sub_actions';
import * as workspaceAPI from '../util/workspace_api_util';
import * as subAPI from '../util/workspace_sub_api_util';

function* addNewWorkspace(action) {
  try {
    const newWorkspace = yield call(
      workspaceAPI.createWorkspace, action.workspace
    );
    yield put(workspaceActions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(workspaceActions.receiveWorkspaceErrors(error));
  }
}

function* subCreatorToNewWorkspace(action) {
  try {
    const { id, ownerId } = action.workspace;
    const workspaceSub = { user_id: ownerId, workspace_id: id };
    const newWorkspaceSub = yield call(
      subAPI.createWorkspaceSub, workspaceSub
    );
    yield put(subActions.createWorkspaceSubSuccess(newWorkspaceSub));
  } catch (errors) {
    yield put(subActions.createWorkspaceSubErrors(errors));
  }
}

export function* workspaceSaga() {
  yield [
    takeEvery(workspaceActions.CREATE_WORKSPACE, addNewWorkspace),
    takeEvery(workspaceActions.CREATE_WORKSPACE_SUCCESS, subCreatorToNewWorkspace),
  ];
}