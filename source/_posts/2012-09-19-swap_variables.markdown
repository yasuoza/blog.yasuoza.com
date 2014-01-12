---
layout: post
title: 変数のスワップ
tags:
- Perl
- ruby
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
大学時代にC言語でプログラミングしているとき、変数のスワップをする必要が出た場合は一時変数用いるように教わりました。

こんなかんじでした。
```
 int tmp = x;
 int x = y;
 int y = tmp;
```

それから数年。今では主に動的言語を使ってプログラミングをしています。
ごく稀に変数のスワップを迫られる場面があり、これまでは上記のようなイケてない(※個人の感想です)方法でスワップしていました。

いろいろ調べたらRubyでは次のようにスワップ出来るようです。
```
a = 'I am a'
b = 'I am b'
a, b = b, a
puts a #=&gt; 'I am b'
puts b #=&gt; 'I am a'
```

Perlではこんなかんじ
```
my $a = 'I am a';
my $b = 'I am b';
($a, $b) = ($b, $a);
say $a; #=&gt; 'I am b'
say $b; #=&gt; 'I am a'
```

JavaScriptはIEでのバグが怖いので素直に一時変数使ってスワップするといいと思います。
<a href="http://stackoverflow.com/questions/872310/javascript-swap-array-elements" target="_blank">Javascript swap array elements - stackoverflow</a>

スワップに迫られる場面殆ど無いですが、あるとしたらイケてる方(※個人の感想です)を使いたいものです。

Perlの方はリストコンテキストをうまく使っているので、パッと見で何をしているのかわかりやすいですが、Rubyの方はちょっとわかりづらい気がします。
どちらもコメントなどでスワップするよ！っていう旨を記載しておくとリーダブルコードになるんじゃないかなと思います。
