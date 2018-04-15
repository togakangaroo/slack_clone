import React from 'react';
import ChannelsMenuContainer from '../channels_menu/channels_menu_container';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { channelSlug, workspaceSlug } = this.props.match.params;
    this.props.loadChannelPage(channelSlug, workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const { channelSlug, workspaceSlug } = this.props.match.params;
    const nextChannelSlug = nextProps.match.params.channelSlug;
    if(channelSlug !== nextChannelSlug) {
      this.props.loadChannelPage(nextChannelSlug, workspaceSlug);
    }
  }

  render() {
    const { channelSlug, workspaceSlug } = this.props.match.params;

    return (
      <div>
        <h1>Channel Page Working! #{ channelSlug }</h1>
      </div>
    );
  }
}

export default ChannelPage;