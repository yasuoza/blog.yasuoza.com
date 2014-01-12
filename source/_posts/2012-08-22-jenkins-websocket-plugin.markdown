---
layout: post
title: Jenkins Websocket Pluginを使う
tags:
- Jenkins
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _sd_is_markdown: ''
  _syntaxhighlighter_encoded: '1'
  _wp_old_slug: jenkins-websocket-plugin%e3%82%92%e4%bd%bf%e3%81%86
---
JenkinsのXFDにWebsocketを使ってそれぞれのビルド結果を表示するようにしました。

<img src="/images/2012/08/IMG_0546-223x300.jpg" alt="" title="IMG_0546" width="223" height="300" class="alignnone size-medium wp-image-246" />

<script src="https://gist.github.com/3411816.js?file=index.html"></script>

参考にしたのは次のサイトです。
Websocketを使った通知の設定方法も書いてあるので、とても参考になりました。
<a href="http://d.hatena.ne.jp/mzp/20110612/jenkins" target="_blank">Jenkinsのビルド結果をリアルタイム通知するプラグイン『Jenkins Websocket Notifier』を作りました</a>
<a href="http://d.hatena.ne.jp/mallowlabs/20110613/xfd" target="_blank">iPhoneをJenkinsのXFD (eXtreme Feedback Device)にしてみた</a>


どちらもそのままだとジョブの名前が出ないので、ジョブが1つだけだといいのですが、2つ以上になるとそれぞれのジョブがどんなステータスなのかわからなかったので、ジョブの名前とステータスを色で表示するようにしています。

はじめは何も表示されませんが、ジョブが完了するとその結果に応じてステータスがビューに表示されます。
2回目以降のジョブは既存のビューのステータスを更新するようになっています。

Jenkinsとても便利です。
