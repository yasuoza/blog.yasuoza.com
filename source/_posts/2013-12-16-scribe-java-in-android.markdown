---
layout: post
title: "scribe-java in Android"
date: 2013-12-16 16:04:52 +0900
comments: true
categories:
- android
- oauth
---

Famous OAuth libraries for Android are

* [oauth-signpost](https://code.google.com/p/oauth-signpost/)
* [scribe-java](https://github.com/fernandezpablo85/scribe-java)

There are entries about how to make OAuth authentication using oauth-signpost but I could not find any example using scribe-java, even though it is said

> Scribe is a mature OAuth library for Java by Pablo Fernandez that is intended to work with all APIs

http://oauth.net/code/

The following example is how to make OAuth 1.0a authentication using scribe-java.

First, create oauth api model:

```java api/TwitterApi.java
public class TwitterApi extends DefaultApi10a {
  private static final String AUTHORIZE_URL = "https://api.twitter.com/oauth/authorize?oauth_token=%s";
  private static final String REQUEST_TOKEN_RESOURCE = "api.twitter.com/oauth/request_token";
  private static final String ACCESS_TOKEN_RESOURCE = "api.twitter.com/oauth/access_token";
  
  @Override {
  public String getAccessTokenEndpoint()
    return "http://" + ACCESS_TOKEN_RESOURCE;
  }

  @Override
  public String getRequestTokenEndpoint() {
    return "http://" + REQUEST_TOKEN_RESOURCE;
  }

  @Override
  public String getAuthorizationUrl(Token requestToken) {
    return String.format(AUTHORIZE_URL, requestToken.getToken());
  }

  public static class SSL extends TwitterApi {
    @Override
    public String getAccessTokenEndpoint() {
      return "https://" + ACCESS_TOKEN_RESOURCE;
    }

    @Override
    public String getRequestTokenEndpoint() {
      return "https://" + REQUEST_TOKEN_RESOURCE;
    }
  }

  /**
   * Twitter 'friendlier' authorization endpoint for OAuth.
   *
   * Uses SSL.
   */
  public static class Authenticate extends SSL {
    private static final String AUTHENTICATE_URL = "https://api.twitter.com/oauth/authenticate?oauth_token=%s";

    @Override
    public String getAuthorizationUrl(Token requestToken) {
      return String.format(AUTHENTICATE_URL, requestToken.getToken());
    }
  }

  /**
   * Just an alias to the default (SSL) authorization endpoint.
   *
   * Need to include this for symmetry with 'Authenticate' only.
   */
  public static class Authorize extends SSL{}
}
```
(Retrieved from [scribe/builder/api/TwitterApi.java](https://github.com/fernandezpablo85/scribe-java/blob/master/src/main/java/org/scribe/builder/api/TwitterApi.java). You can build your own api model like this.)

Then, use this api model in your Activity with WebView :

```java OauthActivity.java
public class OauthActivity extends Activity {

    private static final String CALLBACK_URL = "http://www.twitter.com";

    private WebView mWebView;
    private OauthService mOauthService;
    private Token mRequestToken;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mService = new ServiceBuilder()
          .provider(TwitterApi.class)
          .apiKey("YOUR_API_KEY")
          .apiSecret("YOUR_API_SECRET")
          .callback(HatenaApi.CALLBACK_URL)
          .build();

        mWebView = (WebView) findViewById(R.id.webView);
        mWebView.clearCache(true);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setBuiltInZoomControls(true);
        mWebView.getSettings().setDisplayZoomControls(false);
        mWebView.setWebViewClient(mWebViewClient);
        mWebView.setWebChromeClient(mWebChromeClient);

        setContentView(mWebView);

        startAuthorize();
    }

    private void startAuthorize() {
        (new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... params) {
                mRequestToken = mService.getRequestToken();
                return mService.getAuthorizationUrl(mRequestToken);
            }

            @Override
            protected void onPostExecute(String url) {
                mWebView.loadUrl(url);
            }
        }).execute();
    }

    private WebViewClient mWebViewClient = new WebViewClient() {
        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            if ((url != null) && (url.startsWith(CALLBACK_URL))) { // Override webview when user came back to CALLBACK_URL
                mWebView.stopLoading();
                mWebView.setVisibility(View.INVISIBLE); // Hide webview if necessary
                Uri uri = Uri.parse(url);
                final Verifier verifier = new Verifier(uri.getQueryParameter("oauth_verifier"));
                (new AsyncTask<Void, Void, Token>() {
                    @Override
                    protected Token doInBackground(Void... params) {
                        return mService.getAccessToken(mRequestToken, verifier);
                    }

                    @Override
                    protected void onPostExecute(Token accessToken) {
                        // AccessToken is passed here! Do what you want!
                        finish();
                    }
                }).execute();
            } else {
                super.onPageStarted(view, url, favicon);
            }
        }
    };
}
```

Yeah! You've done! It's easy isn't it?

Keypoints are

* Build service
* Get request token
* Get authorize url
* Get verifier
* Get access token based on the verifier
