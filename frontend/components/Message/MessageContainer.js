import { connect } from 'react-redux';
import Message from './Message';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/messageActions';
import { openRightSidebar } from '../../actions/rightSidebarActions';

const mapStateToProps = state => ({
  editSlug: state.ui.editMessageSlug,
  isEditing: Boolean(state.ui.editMessageSlug),
  currentUserSlug: state.session.currentUser.slug,
});

const mapDispatchToProps = dispatch => ({
  editMessage: message => dispatch(editMessage(message)),
  openEditMessage: message => dispatch(openEditMessage(message)),
  closeEditMessage: () => dispatch(closeEditMessage()),
  deleteMessage: messageSlug => dispatch(deleteMessage(messageSlug)),
  openRightSidebar: (sidebarProps) => {
    const defaultProps = Object.assign({}, { title: "Thread" }, sidebarProps);
    return dispatch(openRightSidebar('THREAD', defaultProps));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);