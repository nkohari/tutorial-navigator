import loadArticleAction from './action/load-article-action';
import loadSettingsAction from './action/load-settings-action';
import navigateAction from './action/navigate-action';
import Breadcrumbs from './components/breadcrumbs';
import Tutorial from './components/tutorial';
import TutorialNavigator from './components/tutorial-navigator';
import TutorialTableOfContents from './components/tutorial-table-of-contents';
import TutorialPrevNext from './components/tutorial-prev-next';
import ArticleService from './services/article-service';
import ServiceKeys from './services/keys';
import ArticleStore from './stores/article-store';
import TutorialStore from './stores/tutorial-store';
import NavigatorAndTutorialView  from './view/navigator-and-tutorial-view';
import createCustomContext  from './util/create-custom-context';
import renderElement  from './util/render-element';

module.exports = {
  
  // Components
  Breadcrumbs,
  NavigatorAndTutorialView,
  Tutorial,
  TutorialNavigator,
  TutorialTableOfContents,
  TutorialPrevNext,

  // Stores
  ArticleStore,
  TutorialStore,

  // Actions
  loadArticleAction,
  loadSettingsAction,
  navigateAction,

  // Utils
  createCustomContext,
  renderElement,

  // Service
  ArticleService,
  ServiceKeys
  
};
