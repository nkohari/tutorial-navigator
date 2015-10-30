import React from 'react';
import NavigateAction from '../action/NavigateAction';

class Quickstart extends React.Component {
  handleClick(quickstart) {
    this.context.executeAction(this.props.customNavigationAction || NavigateAction, {
      baseUrl : this.props.baseUrl,
      appType : quickstart.name
    });
  }

  render() {
    var quickstart = this.props.model;
    var boundClick = this.handleClick.bind(this, quickstart);

    return (
      <div className="quickstart" data-type={quickstart.name} onClick={boundClick}>
        <div className="symbol"></div>
        <strong className="title">{quickstart.title}</strong>
        <p className="description">{quickstart.description}</p>
        <p className="sample">{quickstart.example}</p>
        <div className="cta">
          <button className="btn btn-success btn-sm">Launch Quickstart</button>
        </div>
      </div>
    );
  }
}

Quickstart.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Quickstart;
