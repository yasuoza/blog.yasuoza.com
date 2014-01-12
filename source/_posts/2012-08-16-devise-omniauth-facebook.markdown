---
layout: post
title: devise + omniauth-facebookでリクエストURLにリダイレクトする
categories:
- rails
status: publish
type: post
published: true
---

<a href="https://github.com/plataformatec/devise/" title="devise" target="_blank">devise</a>と<a href="https://github.com/mkdynamic/omniauth-facebook" title="omniauth-facebook" target="_blank">omniauth-facebook</a>で簡単にFacebook認証をアプリに組み込むことができます。
組み込み方は<a href="https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview" target="_blank">devise公式wiki</a>が一番わかり易いと思いますのでそちらを参考にして下さい。

なお、この記事では次のルーティングに従います。
デフォルトのまま使うと/users/sign_upとかついてきますが、facebookログインに限ると必要ありませんからね。
```ruby
devise_for :users, :skip => [:sessions, :registration, :password], :controllers => { :omniauth_callbacks => 'omniauth_callbacks' }
as :user do
  delete '/logout' => 'devise/sessions#destroy', :as => :destroy_user_session
  delete '/delete' => 'devise/registrations#destroy', :as => :destory_user
end
```

コールバックは次のクラスで受け取ります。
```ruby
class OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.find_or_create_from(request.env['omniauth.auth'])
    sign_in_and_redirect @user
  end

end
```

それで例えば、/users以下を閲覧するときには認証をかけたいっていうことが往々にしてあると思います。
それは
```ruby
class UsersController < ApplicationController
  before_filter :authenticate_user!

  def show
    @user = current_user
  end
end
```
のようにしてbefore_filter噛ませてあげると簡単ですが、このままだとユーザが直接/users/:idページを叩いた時にfacebookログインが行われず、基本設定のままだと、ルートにリダイレクトされます。

これを/users/:idページを直接叩いたときは直でfacebookログインにリダイレクトさせて、callbackを受け取った時にもともとリクエストされた/users/:idにリダイレクトさせるには次のように設定します。

```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def authenticate_user!
    session[:user_return_to] = env['PATH_INFO']
    redirect_to user_omniauth_authorize_path(:facebook) unless user_signed_in?
  end
end
```
<code>authenticate_user!</code>をapplication_controller.rbでオーバーライドします。
ポイントは6行目で<code>session[:user_return_to]</code>にリクエストURLを保存しておくことです。
<code>authenticate_member!</code>の場合は<code>session[:member_return_to]</code>に保存します。

これでdeviseの内部実装のちからを借りて<code>sign_in_and_redirect_to @user</code>をした時に元のリクエストURLにリダイレクトされます。

devise自体はそんなに難しいことをしていないので、内部実装を覗くとlib/devise/controllers/helpers.rbの次の2つの関数で<code>session[:user_return_to]</code>からリダイレクト先を取得していることがわかります。
```ruby
def stored_location_for(resource_or_scope)
  scope = Devise::Mapping.find_scope!(resource_or_scope)
  session.delete("#{scope}_return_to")
end

def after_sign_in_path_for(resource_or_scope)
  stored_location_for(resource_or_scope) || signed_in_root_path(resource_or_scope)
end
```


Railsはとても素敵で便利なフレームワークだと思います！Rubyもすごく素敵な言語だなと思います！
