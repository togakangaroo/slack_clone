import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channel_actions';
import * as api from '../util/channel_api_util';
import { createChannelSubSuccess } from '../actions/channel_sub_actions';
import { createChannelSub } from '../util/channel_sub_api_util';
import {
  getPageChannelSlug,
  getChannels,
  getPageWorkspaceSlug,
  getMessageSlug
} from '../reducers/selectors';
import { fetchWorkspace } from './workspace_saga';
import { navigate } from '../actions/navigate_actions';

function* fetchCreatorSub(channelSlug) {
  yield call(createChannelSub, { channelSlug });
}

function* addNewChannel({ channel }) {
  try {
    const newChannel = yield call(api.createChannel, channel);
    yield put(actions.createChannelReceive(newChannel));
  } catch (error) {
    yield put(actions.createChannelFailure(error));
  }
}

function* subCreatorToNewChannel({ channel }) {
  try {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const newSub = yield call(fetchCreatorSub, channel.slug);
    yield put(createChannelSubSuccess(newSub));
    yield put(navigate(`/${workspaceSlug}/${channel.slug}`));
  } catch (error) {
    yield put(actions.createChannelFailure(error));
  }
}

function* fetchEditChannel({ channel }) {
  try {
    const newChannel = yield call(api.editChannel, channel);
    yield put(actions.updateChannelReceive(newChannel));
  } catch (error) {
    yield put(actions.updateChannelFailure(error));
  }
}

function* addNewChannels({ channels }) {
  let newChannels = [];
  for (let channel of channels) {
    const newChannel = yield call(api.createChannel, channel);
    yield call(fetchCreatorSub, newChannel.slug);
    newChannels.push(newChannel);
  }
  yield put(actions.defaultChannelsReceive(newChannels));
}

function* loadFirstDefaultChannel({ channels }) {
  const workspaceSlug = yield select(getPageWorkspaceSlug);
  yield put(navigate(`/${workspaceSlug}/${channels[0].slug}`));
}

function* fetchChannel() {
  try {
    const channelSlug = yield select(getPageChannelSlug);
    const channel = yield call(api.fetchChannel, channelSlug);
    const messageSlug = yield select(getMessageSlug);
    yield put(actions.channelReceive(channel, messageSlug));
  } catch (error) {
    yield put(actions.channelFailure(error));
  }
}

function* loadChannelEntities() {
  const workspaceSlug = yield select(getPageWorkspaceSlug);
  const channels = yield select(getChannels);
  if (channels.length < 1) {
    yield put(actions.channelsRequest());
    yield call(fetchWorkspace, workspaceSlug);
  }
  yield call(fetchChannel);
}

function* fetchDeleteChannel({ channelSlug }) {
  try {
    yield call(api.deleteChannel, channelSlug);
    yield put(actions.deleteChannelReceive(channelSlug));
  } catch (error) {
    yield put(actions.deleteChannelFailure(error));
  }
}

function* watchCreateChannel() {
  yield takeLatest(actions.CREATE_CHANNEL_REQUEST, addNewChannel);
  yield takeLatest(actions.CREATE_CHANNEL_RECEIVE, subCreatorToNewChannel);
}

function* watchEditChannel() {
  yield takeLatest(actions.UPDATE_CHANNEL_REQUEST, fetchEditChannel);
}

function* watchCreateChannels() {
  yield takeLatest(actions.DEFAULT_CHANNELS_REQUEST, addNewChannels);
  yield takeLatest(actions.DEFAULT_CHANNELS_RECEIVE, loadFirstDefaultChannel);
}

function* watchChannelPage() {
  yield takeLatest(actions.CHANNEL_REQUEST, loadChannelEntities);
}

function* watchDeleteChannel() {
  yield takeLatest(actions.DELETE_CHANNEL_REQUEST, fetchDeleteChannel);
}

export function* channelSaga() {
  yield all([
    fork(watchCreateChannel),
    fork(watchEditChannel),
    fork(watchCreateChannels),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}