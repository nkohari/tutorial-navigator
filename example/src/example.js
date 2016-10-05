var EXAMPLE_QUICKSTART_DATA = {
  "native": {
    "title": "Native App",
    "name": "native",
    "description": "Mobile or Desktop, apps that run natively in a device",
    "example": "eg: iOS SDK",
    "question": "Select a native SDK",
    "budicon": 243,
    "slug": "x-native-platforms",
    "platforms": {
      "native-multi-example": {
        "name": "native-multi-example",
        "title": "Native Multi-Step Platform",
        "image": "/media/platforms/react.png",
        "defaultArticle": {
          "name": "native-multi-example-summary",
          "title": "Summary",
          "url": "//articles/x-native-platforms/native-multi-example/summary"
        },
        "articles": [
          {
            "name": "login",
            "number": 1,
            "title": "Login",
            "url": "//articles/x-native-platforms/native-multi-example/login"
          },
          {
            "name": "user-profiles",
            "number": 2,
            "title": "User Profiles",
            "url": "//articles/x-native-platforms/native-multi-example/user-profiles"
          },
          {
            "name": "linking-accounts",
            "number": 3,
            "title": "Linking Accounts",
            "url": "//articles/x-native-platforms/native-multi-example/linking-accounts"
          }
        ]
      },
      "native-single-example": {
        "name": "native-single-example",
        "title": "Native Single-Step Platform",
        "image": "/media/platforms/react.png",
        "articles": [
          {
            "name": "tutorial",
            "number": 1,
            "title": "Tutorial",
            "url": "//articles/x-native-platforms/native-single-example/tutorial"
          }
        ]
      }
    }
  },
  "web": {
    "title": "Web App",
    "name": "web",
    "description": "A JavaScript front-end app that uses an API",
    "example": "eg: AngularJS + NodeJS",
    "question": "What technology are you using for your web app?",
    "budicon": 349,
    "slug": "x-web-platforms",
    "platforms": {
      "web-multi-example": {
        "name": "web-multi-example",
        "title": "Web Multi-Step Platform",
        "image": "/media/platforms/react.png",
        "articles": [
          {
            "name": "login",
            "number": 1,
            "title": "Login",
            "url": "//articles/x-web-platforms/web-multi-example/login"
          },
          {
            "name": "user-profiles",
            "number": 2,
            "title": "User Profiles",
            "url": "//articles/x-web-platforms/web-multi-example/user-profiles"
          },
          {
            "name": "linking-accounts",
            "number": 3,
            "title": "Linking Accounts",
            "url": "//articles/x-web-platforms/web-multi-example/linking-accounts"
          }
        ]
      },
      "web-single-example": {
        "name": "web-single-example",
        "title": "Web Single-Step Platform",
        "image": "/media/platforms/react.png",
        "articles": [
          {
            "name": "tutorial",
            "number": 1,
            "title": "Tutorial",
            "url": "//articles/x-web-platforms/web-single-example/tutorial"
          }
        ]
      }
    }
  },
  "service": {
    "title": "Backend Service",
    "name": "service",
    "description": "Apps or Services running on your backend",
    "example": "eg: Bash, Daemons",
    "question": "Select an API or Backend platform",
    "budicon": 649,
    "slug": "x-service-platforms",
    "platforms": {
      "service-multi-example": {
        "name": "service-multi-example",
        "title": "Service Multi-Step Platform",
        "image": "/media/platforms/react.png",
        "articles": [
          {
            "name": "login",
            "number": 1,
            "title": "Login",
            "url": "//articles/x-service-platforms/service-multi-example/login"
          },
          {
            "name": "user-profiles",
            "number": 2,
            "title": "User Profiles",
            "url": "//articles/x-service-platforms/service-multi-example/user-profiles"
          },
          {
            "name": "linking-accounts",
            "number": 3,
            "title": "Linking Accounts",
            "url": "//articles/x-service-platforms/service-multi-example/linking-accounts"
          }
        ]
      },
      "service-single-example": {
        "name": "service-single-example",
        "title": "Native Single-Step Platform",
        "image": "/media/platforms/react.png",
        "articles": [
          {
            "name": "tutorial",
            "number": 1,
            "title": "Tutorial",
            "url": "//articles/x-service-platforms/service-single-example/tutorial"
          }
        ]
      }
    }
  }
}

let ExampleArticleService = {};

ExampleArticleService.loadArticle = function(quickstarts, payload) {

  let {quickstartId, platformId, articleId, clientId} = payload;

  let tokens = ['http://localhost:5050/docs'];
  if (quickstartId) tokens.push(quickstarts[quickstartId].slug);
  if (platformId)   tokens.push(platformId);
  if (articleId)    tokens.push(articleId);

  let url = tokens.join('/') + "?e=1";
  if (clientId) url += `&a=${clientId}`;

  return new Promise(function(resolve, reject) {
    $.ajax({
      url: url,
      jsonp: "callback",
      dataType: "jsonp",
      success: function(data) {
        return resolve(data.html);
      }
    });
  });

};

var context = TutorialNavigator.createCustomContext(ExampleArticleService);

// Access the example at http://localhost:8990/?single to activate single-article mode.
TutorialNavigator.loadSettingsAction(context, {
  quickstarts: EXAMPLE_QUICKSTART_DATA,
  singleArticleMode: document.location.search.indexOf('single') != -1,
  baseUrl: "https://auth0.com/docs"
}, function(){})

TutorialNavigator.renderElement(document.getElementById('app'), {context});
