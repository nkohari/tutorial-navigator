import TutorialStore from '../stores/tutorial-store';
import ServiceKeys from '../services/keys';

export default function loadArticleAction(context, payload, done) {

  let articleService = context.getService(ServiceKeys.ArticleService);
  let quickstarts = context.getStore(TutorialStore).getQuickstarts();
  let {quickstartId, platformId, articleId, clientId} = payload;

  if (quickstartId && platformId && !articleId) {
    articleId = quickstarts[quickstartId].platforms[platformId].articles[0].name;
  }

  return articleService.loadArticle(quickstarts, {quickstartId, platformId, articleId, clientId})
  .then(html => {
    context.dispatch('ARTICLE_LOAD_SUCCESS', {html, quickstartId, platformId, articleId});
    if (done) done();
  }).catch(err => {
    context.dispatch('ARTICLE_LOAD_FAILURE', err);
    if (done) done();
    return err;
  });

}
