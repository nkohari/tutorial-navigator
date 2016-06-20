import React from 'react';
import navigateAction from '../action/navigate-action';
import TutorialStore from '../stores/tutorial-store';
import {connectToStores} from 'fluxible-addons-react';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
  
  handleClick(params) {
    let action = this.props.customNavigationAction || navigateAction;
    let payload = {};
    if (params.quickstart) payload.quickstartId = params.quickstart.name;
    if (params.platform)   payload.platformId   = params.platform.name;
    if (params.article)    payload.articleId    = params.article.name;
    this.context.executeAction(action, payload);
  }
  
  render() {
    let crumbs = [];
    let {quickstart, platform, article, isRestricted} = this.props;
    
    if (!quickstart) {
      return <div />;
    }
    
    // If we're running in "restricted" mode (eg. in the management site),
    // we're locked into a specific appType, and we don't want to display the
    // top-level Documentation link.
    if (isRestricted) {
      crumbs.push(
        <a key="quickstart" onClick={this.handleClick.bind(this, {quickstart})}>
          <span className="text">{quickstart.title}</span>
        </a>
      );
    }
    else {
      crumbs.push(
        <a key="base" onClick={this.handleClick.bind(this, {})}>
          <span className="text">Documentation</span>
        </a>
      );
      crumbs.push(
        <a key="quickstart" onClick={this.handleClick.bind(this, {quickstart})}>
          <i className="icon-budicon-461"></i><span className="text">{quickstart.title}</span>
        </a>
      );
    }
    
    if (platform) {
      crumbs.push(
        <a key="platform" onClick={this.handleClick.bind(this, {quickstart, platform})}>
          <i className="icon-budicon-461"></i><span className="text">{platform.title}</span>
        </a>
      );
      if (article && platform.articles.length > 1) {
        crumbs.push(
          <a key="article" onClick={this.handleClick.bind(this, {quickstart, platform, article})}>
            <i className="icon-budicon-461"></i><span className="text">{article.title}</span>
          </a>
        );
      }
    }
    
    return <div className="breadcrumbs">{crumbs}</div>;
  }
  
}

Breadcrumbs.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object,
  article: React.PropTypes.object,
  isRestricted: React.PropTypes.bool,
  customNavigationAction: React.PropTypes.func
}

Breadcrumbs.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func,
};

Breadcrumbs = connectToStores(Breadcrumbs, [TutorialStore], (context, props) => {
  let store = context.getStore(TutorialStore);
  return {
    quickstart: store.getCurrentQuickstart(),
    platform: store.getCurrentPlatform(),
    article: store.getCurrentArticle(),
    isRestricted: store.getRestricted()
  };
});

export default Breadcrumbs;
