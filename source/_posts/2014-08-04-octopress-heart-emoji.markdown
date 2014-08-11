---
layout: post
title: "Octopress :heart: Emoji"
date: 2014-08-04 20:33:44 +0900
comments: true
categories:
---

Do you like Emoji? I do.

If you want to use emoji in octopress, follow the steps.

First, add 'gemoji' to development dependencies.

```ruby
group :development do
  gem 'gemoji', '~> 2.0.0'
end
```

Then open `_config.yml` and define `emoji_dir`.

```diff
diff --git a/_config.yml b/_config.yml
index 21b236a..b1136d3 100644
--- a/_config.yml
+++ b/_config.yml
@@ -33,6 +33,7 @@ destination: public
 plugins: plugins
 code_dir: downloads/code
 category_dir: /categories
+emoji_dir: images/emoji
 markdown: rdiscount
 rdiscount:
   extensions:
```

Create `emoji.rb` in plugins directory with following content.

```ruby
# Jekyll Emoji
#
# Originally developed by
# Chris Kempson (http://chriskempson.com)
# https://github.com/chriskempson/jekyll-emoji
#
# A jekyll plug-in that provides a Liquid filter for emojifying text with
# https://github.com/github/gemoji. See http://www.emoji-cheat-sheet.com for
# a full listing of emoji codes.
#
# Installation:
#   - Run `gem install gemoji` or add `gem 'gemoji'` to your gemfile and run `bundle install`
#   - Copy this file to your `_plugins` directory
#   - Add a line like `emoji_dir: images/emoji` to your `_config.yml`
#   - If you want to use external source for emoji, set `emoji_dir: http://...` to your `_config.yml`.
#
# Usage:
#   - Apply the filter wherever needed e.g. {{ content | emojify }}
#   - Add some emoji to your article! e.g. "Hello :wink:"

require 'gemoji'

module Jekyll

  module EmojiFilter

    def emojify(content)
      return false if !content

      config = @context.registers[:site].config
      return if config['emoji_dir'].nil?

      if config['emoji_dir']
        if config['emoji_dir'].start_with?('http')
          emoji_dir = config['emoji_dir']
        else
          emoji_dir = '/' + File.join(config['emoji_dir'])
        end
      end

      content.to_str.gsub(/:([a-z0-9\+\-_]+):/) do |match|
        if emoji_dir && emoji = Emoji.find_by_alias($1) { false }
          %Q(<img alt="#{$1}" src="#{emoji_dir}/#{emoji.image_filename}" class="emoji" />)
        else
          match
        end
      end
    end
  end

  class EmojiGenerator < Generator
    def generate(site)
      config = site.config
      return false if not config['emoji_dir']
      return false if config['emoji_dir'].start_with?('http')
      emoji_dir = File.join(config['source'], config['emoji_dir'])
      return false if File.exist?(emoji_dir + '/smiley.png')

      # Make Emoji directory
      FileUtils.mkdir_p(emoji_dir)

      # Copy Gemoji files
      Dir["#{Emoji.images_path}/emoji/*"].each do |src|
        FileUtils.cp_r src, emoji_dir
      end
    end
  end

end

Liquid::Template.register_filter(Jekyll::EmojiFilter)
```

Next open `sass/custom/_styles.scss` and add

```sass
.emoji {
  box-shadow: none;
  border: 0;
  height: 20px;
  margin-bottom: 5px;
  vertical-align: middle;
}
```

Finally edit `source/_includes/article.html` and `emojify` your content like

{% raw %}
```ruby
<div class="entry-content">{{ content | excerpt | emojify }}</div>
```
{% endraw %}

Done! You can use emoji now! Enjoy!:sunglasses::sunglasses::sunglasses:
