import React from 'react';
import TutorialStore from '../stores/tutorial-store';
import ArticleStore from '../stores/article-store';
import Breadcrumbs from '../components/breadcrumbs';
import Tutorial from '../components/tutorial';
import TutorialTableOfContents from '../components/tutorial-table-of-contents';
import { connectToStores, provideContext } from 'fluxible-addons-react';

// TODO: There's a lot of duplication here vs. the TutorialPage component in auth0-docs.
// Could this be generalized in some way so it could work in both places?

class TutorialView extends React.Component {

  renderTitle() {
    let {platform, article, singleArticleMode} = this.props;
    if (platform && article) {
      if (singleArticleMode || platform.articles.length === 1 || article.number === 0) {
        return platform.title + " SDK Tutorial";
      } else {
        return platform.title + " " + article.title;
      }
    }
  }

  render() {

    let {quickstart, platform, article, singleArticleMode} = this.props;
    let sidebar = null;
    let tutorial = null;
    let columnWidth = 12;

    if (!singleArticleMode && platform && platform.articles.length > 1) {
      columnWidth = 9
      sidebar = <div className="col-sm-3">
        <TutorialTableOfContents quickstart={quickstart} platform={platform} currentArticle={article} />
      </div>;
    }

    return (
      <div id="tutorial-template" className="docs-single animated fadeIn">
        <div className="js-doc-template container">
          <div className="row">
            {sidebar}
            <div className={"col-sm-" + columnWidth}>
              <div className="navigation">
                <Breadcrumbs {...this.props} />
              </div>
              <section className="docs-content">
                <h1 className="tutorial-title">{this.renderTitle()}</h1>
                <Tutorial {...this.props} />
              </section>
              <div id="try-banner">
                <div className="try-banner try-banner-alt">
                  <span>Try Auth0 for FREE</span>
                  <a href="javascript:signup()" className="btn btn-success btn-lg">Create free Account</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TutorialView.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object,
  article: React.PropTypes.object,
  componentLoadedInBrowser: React.PropTypes.func
}

TutorialView.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

export default TutorialView;
