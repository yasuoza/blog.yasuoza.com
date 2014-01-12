---
layout: post
title: KeyRemap4MacBookでキーレスポンス速度を上げて快適なプログラミングを
tags:
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _sd_is_markdown: ''
---
<h3>背景</h3>
Macのキーレスポンスはデフォルトだとかなり丁寧で、むしろ重く感じる時のほうが多くプログラミングをしているときにイライラする時が結構ありました。

そんな折、前に参加した勉強会でKeyRemap4MacBookを使ってキーレスポンスを上げるとかなり捗るよっていうのを教えてもらったので、メモしておこうと思います。

<a href="http://pqrs.org/macosx/keyremap4macbook/" target="_blank">KeyRemap4MacBook</a>は言わずと知れたMacでキーの割当を変えるツールです。例えばUSキーボードのコマンドをJISキーボードのかな/英数と同じように振舞わせるみたいなこともできたりして便利です(僕はやってませんが)。

このKeyRemap4MacBookを使うとキーレスポンスの待ち時間少なくすることができます。カメラの連写速度を上げるというイメージが一番近いと思います。

<h3>インストール</h3>
インストール方法はまずKeyRemap4MacBookを<a href="http://pqrs.org/macosx/keyremap4macbook/" target="_blank">本家サイト</a>からダウンロードして解凍してインストールします。
*僕がインストールしたときはThe Unarchiver.appを使うとファイルが壊れるらしく、Macに最初から入っている解凍アプリを使わないとうまく解凍してインストールするということができませんでした。今は直っているかも知れません。

<h3>設定</h3>
インストールすると環境設定.appのその他の項目にKeyRemap4MacBookの項目が追加されます。

<a href="/images/2012/06/Screen-Shot-2012-06-29-at-1.09.59-AM.png"><img src="/images/2012/06/Screen-Shot-2012-06-29-at-1.09.59-AM.png" alt="" title="環境設定.app" width="782" height="675" class="aligncenter size-full wp-image-153" /></a>

それをクリックして「Key Repeat」の項目を開きます。

<a href="/images/2012/06/Screen-Shot-2012-06-29-at-1.12.59-AM.png"><img src="/images/2012/06/Screen-Shot-2012-06-29-at-1.12.59-AM.png" alt="" title="環境設定KeyReat" width="782" height="769" class="aligncenter size-full wp-image-155" /></a>

変更するのは一番上の[Key Repeat] Initaial Wait の項目とその次の[Key Repeat] Waitの項目。
それぞれデフォルトは500、83になっていますが、僕は写真のようにそれぞれ200、20に設定しています。

設定したら特に保存ボタンとか押さず環境設定.appを閉じます。

<h3>検証</h3>
適当にメモ帳などを開き、文章を入力して、delete(Ctrl+h)ボタンを押してみて下さい。予期していたよりたくさんの文字が消えたはずです。
たくさん文章を入力してカーソルキー(Ctrl+(n,p,b,f))でカーソルを移動させてみても予期していたよりかなり早くカーソルが移動します。

つまり、より短い時間でテキストを消したり、より短い時間でカーソルを移動させたい場所に移動させることができるようになります！

<h3>まとめ</h3>
KeyRemap4MacBookはとても便利なツールです。caps lockをcontrolに変えたりとかは環境設定.appでもできるけど、KeyRemap4MacBookがあれば、コマンドを押したら日本語と英語の切り替えを行うみたいな複雑な設定を行うことができます。

自分はこんな設定で使ってる！こうすると便利！みたいな設定があればぜひ教えて下さい！
