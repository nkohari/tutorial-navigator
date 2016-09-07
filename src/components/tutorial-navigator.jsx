import React from 'react';
import Breadcrumbs from './breadcrumbs';
import QuickstartList from './quickstart-list';
import PlatformList from './platform-list';
import TutorialStore from '../stores/tutorial-store';
import {connectToStores} from 'fluxible-addons-react';

class TutorialNavigator extends React.Component {
  
  render() {
    
    let {quickstart, firstQuestion} = this.props;

    let picker = undefined;
    let question = undefined;
    let breadcrumbs = undefined;

    if (quickstart) {
      picker = <PlatformList {...this.props} />;
      question = quickstart.question;
      breadcrumbs = <Breadcrumbs {...this.props} />;
    }
    else {
      picker = <QuickstartList {...this.props} />;
      question = firstQuestion;
    }
    
    return (
      <div id="tutorial-navigator">
        <div className='js-tutorial-navigator'>
          <div className="banner tutorial-wizard">
            <div className="container">
              <p className='question-text'>{question}</p><br/>
              {breadcrumbs}
            </div>
            {picker}
          </div>
        </div>
      </div>
    );
  }
  
}

TutorialNavigator.defaultProps = {
  firstQuestion: "Choose your application type"
};

TutorialNavigator.propTypes = {
  quickstarts: React.PropTypes.object,
  quickstart: React.PropTypes.object,
  firstQuestion: React.PropTypes.string,
  singleArticleMode: React.PropTypes.bool
}

TutorialNavigator = connectToStores(TutorialNavigator, [TutorialStore], (context, props) => {
  let store = context.getStore(TutorialStore);
  return {
    quickstarts: store.getQuickstarts(),
    quickstart: store.getCurrentQuickstart()
  };
});


export default TutorialNavigator;
