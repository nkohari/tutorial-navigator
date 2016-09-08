import React from 'react';
import TutorialStore from '../stores/tutorial-store';
import TutorialNavigator from '../components/tutorial-navigator';
import TutorialView from './tutorial-view';
import { connectToStores, provideContext } from 'fluxible-addons-react';

class NavigatorAndTutorialView extends React.Component {
  
  render() {
    if (this.props.article) {
      return <TutorialView {...this.props} />;
    }
    else {
      return <TutorialNavigator {...this.props} />;
    }
  }
  
}

NavigatorAndTutorialView.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object,
  article: React.PropTypes.object,
  componentLoadedInBrowser: React.PropTypes.func
}

NavigatorAndTutorialView.contextTypes = {
  getStore: React.PropTypes.func,
  executeAction: React.PropTypes.func
};

NavigatorAndTutorialView = provideContext(connectToStores(NavigatorAndTutorialView, [TutorialStore], (context, props) => {
  let tutorialStore = context.getStore(TutorialStore);
  return {
    quickstart: tutorialStore.getCurrentQuickstart(),
    platform: tutorialStore.getCurrentPlatform(),
    article: tutorialStore.getCurrentArticle(),
    isSingleArticleMode: tutorialStore.getSingleArticleMode()
  };
}));

export default NavigatorAndTutorialView;
