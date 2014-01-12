---
layout: post
title: "Blog update notificator"
date: 2012-12-15 16:22
comments: true
categories:
- diary
- ruby
---

```ruby
require 'feed-normalizer'
require 'twitter'

option = Hash[[ARGV]]

url = option['--url']

class FeedTweeter
  def initialize(arg = {url: nil})
    @url = arg[:url]
  end

  def site_updated?
    @feed = FeedNormalizer::FeedNormalizer.parse open(@url)
    @new_entry = @feed.entries.first

    return true unless File.exist? "#{current_file_dirpath}/#{remember_text_file}"

    last_tweeted_on = Time.parse(File.open(remember_text_file).read)
    last_tweeted_on < @new_entry.last_updated
  end

  def tweet!
    tweet_text = make_tweet_text
    Twitter.update(tweet_text)

    remember_last_tweeted_on!
  end

  private
    def current_file_dirpath
      "#{File.expand_path('../',  __FILE__)}"
    end

    def remember_text_file
      'last_tweeted_on.txt';
    end

    def make_tweet_text
      blog_title = @feed.title
      new_entry_title = @new_entry.title
      new_entry_url = @new_entry.url
      "#{new_entry_title} - #{blog_title} #{new_entry_url}"
    end

    def remember_last_tweeted_on!
      File.open("#{current_file_dirpath}/#{remember_text_file}", 'w') do |file|
        file.write(@new_entry.last_updated)
      end
    end
end

Twitter.configure do |config|
  config.consumer_key = 'CONSUMER_KEY'
  config.consumer_secret = 'CONSUMER_SECRET'
  config.oauth_token = 'OAUTH_TOKEN'
  config.oauth_token_secret = 'OAUTH_TOKEN_SECRET'
end

feed_tweeter = FeedTweeter.new url: url
if feed_tweeter.site_updated?
  feed_tweeter.tweet!
end
```

This works with jenkins very well!
