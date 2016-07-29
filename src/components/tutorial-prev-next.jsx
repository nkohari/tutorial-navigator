import React from 'react';
import _ from 'lodash';
import loadArticleAction from '../action/load-article-action';
import navigateAction from '../action/navigate-action';

class TutorialPrevNext extends React.Component {
  
  handleClick(article) {
    let {quickstart, platform, customNavigationAction} = this.props;
    let payload = {
      quickstartId: quickstart.name,
      platformId: platform.name,
      articleId: article.name
    };
    if (customNavigationAction) {
      this.context.executeAction(customNavigationAction, payload);
    }
    else {
      Promise.all([
        this.context.executeAction(loadArticleAction, payload),
        this.context.executeAction(navigateAction, payload)
      ]);
    }
  }

  render() {

    let {platform, currentArticle} = this.props;
    let prev = undefined, next = undefined;

    if (currentArticle) {
      let currentIndex = currentArticle.number - 1;
      if (currentIndex > 0) {
        let prevArticle = platform.articles[currentIndex - 1];
        prev = <a className="tutorial-prevnext-prev" onClick={this.handleClick.bind(this, prevArticle)}>
          <i className="icon-budicon-463" />{prevArticle.title}
        </a>;
      }
      if (platform.articles.length > 1 && currentIndex < platform.articles.length) {
        let nextArticle = platform.articles[currentIndex + 1];
        next = <a className="tutorial-prevnext-next" onClick={this.handleClick.bind(this, nextArticle)}>
          {nextArticle.title} <i className="icon-budicon-461" />
        </a>;
      }
    }
    
    return (
      <div className="tutorial-prevnext">
        {prev}
        {next}
      </div>
    );
  }
  
}

TutorialPrevNext.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object,
  currentArticle: React.PropTypes.object,
  customNavigationAction: React.PropTypes.func
}

TutorialPrevNext.contextTypes = {
  executeAction: React.PropTypes.func
};

export default TutorialPrevNext;
