---
layout: post
title: "HBFav-Android 2.1.1リリース"
date: 2013-12-27 13:39:25 +0900
comments: true
categories:
- hbfav
- android
---

HBFav for Androidの2.1.1をリリースしました!

[はてなブックマークをタイムライン形式で HBFav](https://play.google.com/store/apps/details?id=com.hbfav.android)

今回のバージョンアップでは

* ビルトインブラウザ
* コメントの閲覧
* アプリ単体でのブックマーク登録・更新・削除機能

の追加をしました。

いちいちブラウザに飛ぶことはなくなったので、よりシームレスに記事を閲覧することが出来るようになったと思います。

{% img center /images/hbfav/entry_webview.jpg 350 %}

{% img center /images/hbfav/activity_bookmark_entry.jpg 350 %}

OAuth認証したり、異なるサイズのボタンを配置したり、キーボードの開閉に合わせた挙動をさせたりと、まぁまぁ大変でした。  
1週間ブックマークを見る暇なくずっとブックマーク登録画面だけ開発してたなんてときもありましたが、それでも総じて楽しかったです。

一部の端末で正しくOauth認証出来ないバグが確認されております。年明けから対応していきます。Android大変です。。。  
また、アプリが落ちたり、うまく動作しない場合は[Github](https://github.com/yasuoza/HBFav-Android/issues)に書いて頂くか、[@yasuoza](https://www.twitter.com/yasuoza)まで
お気軽にメンションください。出来る限りのサポートはしていきます。

今後ともHBFav-Androidをよろしくお願いします!


Special thanks :heart::heart::heart:

* [株式会社はてな様](https://www.hatena.com/) 問い合わせに対してご丁寧に対応していただきました。
* [stackoverflowさん](http://stackoverflow.com/) 今回も引き続きお世話になりました。
* [Android Asset Studioさん](http://android-ui-utils.googlecode.com/hg/asset-studio/dist/index.html) UI実装に大変役立ちました。
* [Android Holo Colors Generator](http://android-holo-colors.com/) UI実装に大変役立ちました。


年末年始はdockerで遊ぶ予定です。dockerを利用してちょっと作りたいものがあるので、ちょっと実験してみます。
