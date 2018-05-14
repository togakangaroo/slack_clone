import { connect } from 'react-redux';
import ChannelSessionForm from './SessionForm';
import { signUp, signInRequest } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  isSignInPage: location.pathname === '/signin',
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => {
    if (ownProps.location.pathname === '/signin') {
      return dispatch(signInRequest(user));
    } else {
      return dispatch(signUp(user));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSessionForm);