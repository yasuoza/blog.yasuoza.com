---
layout: post
title: ! 'Encoding::InvalidByteSequenceError'
tags:
- Jenkins
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  _wp_old_slug: jenkins%e3%81%a7encodinginvalidbytesequenceerror%e3%81%ae%e5%af%be%e5%87%a6%e6%b3%95
---
Jenkinsネタ続きますが、Jenkinsでcucumber使った受け入れテストを自動化させようと思ってたら

<pre>
/usr/local/lib/ruby/gems/1.9.1/gems/json-1.7.5/lib/json/common.rb:155:in `encode': "\xD8" on US-ASCII (Encoding::InvalidByteSequenceError)
</pre>
っていうエラーが出てcucumberの実行すらできなくてハマったので、解決法のメモ。

Manage Jenkins &gt;&gt; configure system から環境変数を次のように設定。
<a href="/images/2012/08/Screen-Shot-2012-08-24-at-5.32.13-PM.png"><img class="alignnone size-large wp-image-261" title="Screen Shot 2012-08-24 at 5.32.13 PM" src="/images/2012/08/Screen-Shot-2012-08-24-at-5.32.13-PM-1024x258.png" alt="" width="770" height="194" /></a>

これで、localeのLANGUAGEがen_US.UTF8になって、jsonのエンコードに関するエラーが起きなくなります。


これ、実際にjenkinsテストサーバにsshログインして
```
$ sudo -u jenkins bundle exec cucumber
```
だとcucumberの実行が出来るっていうところでかなりハマりました。
