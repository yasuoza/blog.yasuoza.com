---
layout: post
title: "Sprockets with Padrino without plugin"
date: 2013-04-06 18:24
comments: true
categories:
- ruby
- padrino
---

One day I was searching to integrate `sprockets` to my padrino application, I found following article to make it.
[Sprockets & Bower in my Padrino please.](http://arthurchiu.com/posts/20130328-sprockets_bower_padrino)
In the article he explained to integrate sprockets to padrino using [sprockets-helpers](https://github.com/petebrowne/sprockets-helpers), through rack.

I was so excited because the content is what I wanted to do. But few hours after, I realized the way he explained works good for `development` and `production` environment, but not for `test` environment since in `test` environment,
`/assets` is not mounted to padrino itself. So, testing with javascript like `data-confirm` testing will fail because javascript(and other assets too) is not loaded!

I began to search how to mount(or insert) sprockets middleware in padrino applicaiton again and found the following way to solve the issue.

The difference found way and previous article way is just how to insert sprockets middleware.
So, `Gemfile`, `config/sprockets.rb` and `Rakefile` are same.
`app/app.rb` differs little bit, and `lib/sprockets_initializer.rb` will be newly created.

`lib/sprockets_initializer.rb` is used to register to use [Sprockets::Server](https://github.com/sstephenson/sprockets/blob/master/lib/sprockets/server.rb) for assets request handler.

```ruby lib/sprockets_initializer.rb
module SprocketsInitializer
  def self.registered(app)
    # Make it lazy
    options[:asset_prefix] = -> { Sprockets::Helpers.prefix }

    app.use ::SprocketsInitializer::Rack, options
  end

  class Rack
    def initialize(app, options={})
      @app = app
      @asset_prefix = options[:asset_prefix].call
    end

    def call(env)
      if env['PATH_INFO'].match(@asset_prefix)
        env['PATH_INFO'].gsub!(@asset_prefix, '')
        return PadrinoSprocekts.environment.call(env)
      end

      @app.call(env)
    end
  end
end
```

In `app/app.rb` register it only for not production environment because in production environment, I want to let application read assets from compiled assets path.

``` ruby app/app.rb
module Web
  class App < Padrino::Application
    register Padrino::Rendering
    register Padrino::Mailer
    register Padrino::Helpers
    register SprocketsInitializer unless Padrino.env == :production
    helpers Sprockets::Helpers

  end
end
```

If you want, delete mounted sprockets from `config.ru`

``` ruby config.ru
require File.expand_path("../config/boot.rb", __FILE__)

run Padrino.application
```

After changed configuration like above, you can test your application previous style.

```plain
$ rake spec
```

Thank you for reading!
