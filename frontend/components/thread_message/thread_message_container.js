import { connect } from 'react-redux';
import ThreadMessage from './thread_message';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/message_actions';

const mapStateToProps = state => ({
  editId: state.ui.editMessageId,
  isEditing: Boolean(state.ui.editMessageId),
  currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  editMessage: message => dispatch(editMessage(message)),
  openEditMessage: message => dispatch(openEditMessage(message)),
  closeEditMessage: () => dispatch(closeEditMessage()),
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadMessage);