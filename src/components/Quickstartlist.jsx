import React from 'react';
import Quickstart from './Quickstart';

class QuickstartList extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.componentDidMountClient();
    }
  }
  componentDidMountClient() {
    // Runs only on client, not on server
    if (this.props.onQuickstartLoaded) {
      this.props.onQuickstartLoaded.call(this);
    }
  }
  render() {
    var list = [];
    var hide = (!this.props.quickstart.apptypes) ? 'hide ' : '';

    this.props.quickstart.apptypes.forEach(function(appType, i) {
        list.push(
          <Quickstart key={i} model={appType} baseUrl={this.props.baseUrl} onDocumentLoaded={this.props.onDocumentLoaded}  customNavigationAction={this.props.customNavigationAction}/>
        );
    }.bind(this));

    return (
      <div className={hide + "quickstart-list container"}>
        <div className="js-carousel" ref="carousel">{list}</div>
      </div>
    );
  }
}

export default QuickstartList;
