---
layout: post
title: brew upgrade gitでハマる
tags:
- git
- homebrew
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
<a href="http://mxcl.github.com/homebrew/" target="_blank">Homebrew</a>で

```
$ brew upgrade git
```


を実行すると

```
symbol(s) not found for architecture x86_64
```


というエラーが出てgitをアップグレードできない問題にハマったので、解決法のメモ。

```
$ brew list
```


すると
<code>libiconv</code>
というモジュールがあると思うので、それを次のようにアンインストール

```
$ brew remove libiconv
```
パーミッションのエラーなどでアンインストール出来ない場合は
```
$ sudo rm -rf /usr/local/Cellar/libiconv
```
で削除。

その後
```
$ brew upgrade git
```
でうまくいく。

このlibiconvがどこで入ってきたのか謎すぎる。

<a href="https://github.com/mxcl/homebrew/issues/11229" target="_blank">Error when installing git: symbol(s) not found for architecture x86_64 - github</a>
