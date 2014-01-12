---
layout: post
title: "Wordpress to Octpress"
date: 2012-12-09 01:32
comments: true
categories:
- diary
---

It's very easy.

```ruby
# Downlowd wordpressdotocm.rb first
# https://github.com/mojombo/jekyll/blob/master/lib/jekyll/migrators/wordpressdotcom.rb

require './wordpressdotcom'

WORDPRESS_XML = 'wordpress_exported.xml'
WORDPRESS_URL = 'http://yourhost.com'

Jekyll::WordpressDotCom.process(WORDPRESS_XML)

# Copy _posts/.html file to markdown_posts/.markdown
FileUtils.mkdir_p('markdown_posts')
Dir[File.join(File.expand_path("../_posts/",  __FILE__),  "*.html")].each do |file|
  # Change wp image path to octpress image path
  # Change SyntaxHighlighter Evolved favor to mrkdown favor
  source = open(file).read
  file.match(/([\w-]+)\.html/)
  File.open("markdown_posts/#{$1}.markdown",  'w') do |dest|
    source.gsub!("#{WORDPRESS_URL}/wp-content/uploads/",  '/images/')
    source.gsub!(/\[(\w+)\]/,  "```")
    source.gsub!(/\[\/\w+\]/,  "```")
    dest.write(source)
  end
end
```
