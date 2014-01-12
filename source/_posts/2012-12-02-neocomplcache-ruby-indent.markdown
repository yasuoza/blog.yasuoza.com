---
layout: post
title: ! '[解決]neocomplcacheでrubyのインデントがずれる'
tags:
- ruby
- vim
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
<a href="https://github.com/vim-ruby/vim-ruby" target="_blank">vim-ruby</a>入れましょう

```
NeoBundle 'vim-ruby/vim-ruby'
```

<br>
<br>

<blockquote class="twitter-tweet"><p>neocomplcacheオンにしてruby書くとelseのインデントが左寄せにならない。</p>&mdash; Yasuharu Ozaki (@YasuOza) <a href="https://twitter.com/YasuOza/status/271541758087819264" data-datetime="2012-11-22T09:12:54+00:00">November 22, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-in-reply-to="274396359459745792"><p>@<a href="https://twitter.com/yasuoza">yasuoza</a> 原因がわかりました。こちらの環境では、vim-rubyをインストールしていて、これを有効にしたらインデントを行いますが無効にするとインデントされませんでした。</p>&mdash; Shougo.Matsu (@ShougoMatsu) <a href="https://twitter.com/ShougoMatsu/status/275165404710703104" data-datetime="2012-12-02T09:11:59+00:00">December 2, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-in-reply-to="275165987916087296"><p>@<a href="https://twitter.com/shougomatsu">shougomatsu</a> vim-rubyインストールすることで、neocomplcacheを使ってelseのインデントが正しく戻るようになりました！いろいろサポートしていただき、本当にありがとうございました。今まで以上に便利に使わせて頂きます。</p>&mdash; Yasuharu Ozaki (@YasuOza) <a href="https://twitter.com/YasuOza/status/275234736379670528" data-datetime="2012-12-02T13:47:29+00:00">December 2, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


これで今まで以上に気持よくRubyが書けるようになりました！
@Shougo.Matsuさん、手厚いサポートしていただき、本当にありがとうございました！
