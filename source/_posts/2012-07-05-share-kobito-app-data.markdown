---
layout: post
title: kobito.appのデータを複数のMacで共有する
tags:
- WebDevelopment
status: publish
type: post
published: true
meta:
  _sd_is_markdown: '1'
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
<p>僕はQuitaが開発をしている<a href="http://kobitoapp.com/" target="_blank">Kobito.app</a>を使って公開できないコードや、オフラインでも使いたいコードをメモしています。</p>

<p>そのKobito.appはEvernoteのように複数端末間でデータを共有できないので、そのデータをDropboxを介して共有するコマンドです。
ターミナルを開いて次のコマンドを入力して下さい。</p>

```
$ mkdir -p ~/Dropbox/.KobitoDB
$ mv ~/Library/Kobito/Kobito.db ~/Dropbox/.KobitoDB/
$ ln -s ~/Dropbox/.KobitoDB/Kobito.db ~/Library/Kobito/
```

<p>単純にDropboxに隠しディレクトリを作ってそこに今のKobito.appのDBを移動して、前あった場所にシンボリックリンクを貼るというだけの簡単なコマンドです。</p>

<p>ただ、Kobito.appの挙動を追っているとエントリーを追加して保存(cmd+s)をしてもDBに格納するわけではなく、新規で保存したエントリーはオンメモリで保存しておき、kobito.appが終了(cmd+q)するときに新規で保存したエントリーをDBに格納するようです。</p>

<p>なので、複数端末間でデータを共有するためにはある程度エントリーをある程度書いたらアプリケーションを終了するしかないようです。</p>

<p>また、アプリ起動中はDBに変更があってもアプリケーション側ではDBをロードせず、他の端末で追加されたエントリーをリアルタイムで取得できません。
これも一度アプリを終了して再度立ち上げると解決します。</p>

<p>僕は基本的に不必要なアプリは終了してメモリを開放してあげるようにしているので、上記の使い方でも問題なく、複数端末間で共有できてかなり捗ってます。</p>

<p>複数端末でKobito.appを使っている場合はぜひお試しください。</p>
