import React from 'react';
import Quickstart from './quickstart';

class QuickstartList extends React.Component {

  componentDidMount() {
    if (this.props.componentLoadedInBrowser && typeof window !== 'undefined') {
      this.props.componentLoadedInBrowser.call(this);
    }
  }

  render() {
    let {quickstarts, customNavigationAction} = this.props;
    let items = null;
    let hide = 'hide ';
    if (quickstarts) {
      hide = '';
      items = Object.keys(quickstarts).map(name => (
        <Quickstart
          key={name}
          quickstart={quickstarts[name]}
          customNavigationAction={customNavigationAction} />
      ));
    }
    return (
      <div className={hide + "quickstart-list container"}>
        <div ref="carousel">{items}</div>
      </div>
    );
  }

}

QuickstartList.propTypes = {
  quickstarts: React.PropTypes.object,
  customNavigationAction: React.PropTypes.func,
  componentLoadedInBrowser: React.PropTypes.func
};

export default QuickstartList;
