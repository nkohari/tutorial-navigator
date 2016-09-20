import React from 'react';
import _ from 'lodash';

const BASE_URL = "https://auth0.com/docs/quickstart";
const DEFAULT_ARTICLE_BUDICON = 691;

class TutorialNextSteps extends React.Component {

  render() {

    let {quickstart, platform} = this.props;

    let items = platform.articles.map((article, index) => {
      let icon = article.budicon ? article.budicon : DEFAULT_ARTICLE_BUDICON;
      let href = [BASE_URL, quickstart.name, platform.name, article.name].join('/');
      return (
        <li key={index} className="tutorial-next-steps-article">
          <a href={href} target="_blank">
            <i className={"icon icon-budicon-" + icon } />
            {article.title}
          </a>
        </li>
      );
    });

    return (
      <div className="tutorial-next-steps">
        <h2>What can you do next?</h2>
        <p>Check our tutorials to learn more about using Auth0 in your {platform.title} apps.</p>
        <ul className="tutorial-next-steps-articles">
          {items}
        </ul>
      </div>
    );

  }

}

TutorialNextSteps.propTypes = {
  quickstart: React.PropTypes.object,
  platform: React.PropTypes.object
}

export default TutorialNextSteps;
