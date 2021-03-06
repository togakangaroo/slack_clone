import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { channelRequest } from '../../actions/channelActions';
import { getMessages } from '../../reducers/selectors';

const mapStateToProps = (state, { match }) => ({
  messages: getMessages(state),
  workspaceSlug: match.params.workspaceSlug,
  channelSlug: match.params.channelSlug,
  messageSlug: match.params.messageSlug
});

const mapDispatchToProps = dispatch => ({
  channelRequest: (channelSlug, ui) => dispatch(
    channelRequest(channelSlug, ui)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);