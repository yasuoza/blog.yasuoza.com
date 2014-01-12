---
layout: post
title: 'activemodel-attribute_changed_specification'
date: 2012-12-19 10:02
comments: true
categories:
- ruby
- rails
- gem
---
On Dec 12, one feature suggestion posted to [Rails-core] ML.
The title was "Active Record, changes from.. to.."

His suggested feature was like following

```ruby
class Book < ActiveRecord::Base
  STATUS_DELIVER = [0, 1]
  before_save :send_mail_to_customer

  def send_mail_to_customer
   UserMailer.send_mail_to_customer if self.status.changes(from: 0, to: 1)
  end
end
```

I knew this can be done in [ActiveModel::Dirty](http://api.rubyonrails.org/classes/ActiveModel/Dirty.html), but the feature `from` and `to` was interesting. So I implemented into gem named [activemodel-attribute_changed_specification](https://github.com/YasuOza/activemodel-attribute_changed_specification).

You can use this gem like this

```ruby
user = User.new
user.name = 'Bob'
user.name_changed?(from: nil,  to: 'Bob') # => true
user.name_changed?(from: 'Paul',  to: 'Bob') # => false
```

Though I overridden default `_changed?` method, I kept original `_changed?` method.

```ruby
user = User.new
user.name = 'Bob'
user.name_changed? # => true
```

This is my first gem. Yeah, it's fun!
