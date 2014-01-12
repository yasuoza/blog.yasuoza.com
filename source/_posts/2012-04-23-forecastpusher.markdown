---
layout: post
title: ForecastPusher
tags:
- Application
- ForecastPusher
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _sd_is_markdown: '1'
  _wp_old_slug: '87'
---
<p>その日のお天気予報をTwitterのメンションで飛ばしてくれるWebサービスを作りました。</p>

<ul>
<li><a href="http://forecast.yasuoza.com">ForecastPusher</a></li>
</ul>

<p>毎日わざわざ天気予報を取得しに行くのは非常にめんどくさくて、なんとかPushで教えてくれるもの無いかな考えていたところ、Twitterのメンション形式にすればその日の天気予報をPushしてくれることに気づき、実現してみました。</p>

<p>今回一番悩んだのはお天気予報をメンションするアカウントです。考えられる実装は2つでした。</p>

<ul>
<li>bot用のアカウントを作成してメンションを飛ばす</li>
<li>自分から自分にメンションを飛ばす</li>
</ul>

<p>最初の方法だと、確実にPush通信が来て通知が起動します。通知が起動するというところがポイントで、ちょっと寝坊したい時にも通知によりバイブレーションがなったりするので、僕はいやでした。</p>

<p>そこで自分から自分にメンションを飛ばすという方法を取りました。</p>

<p>この方法にすると通知は起動しないので、寝坊したい時も確実に寝坊できます。ただ、通知が来ないので、メンション一覧を自分で開かないといけないのですが、そこは寝坊を優先した結果です。</p>

<p><a href="/images/2012/04/Screen-Shot-2012-04-23-at-22.29.591.png"><img src="/images/2012/04/Screen-Shot-2012-04-23-at-22.29.591.png" alt="" title="ForecastPusher" width="575" class="aligncenter size-full wp-image-99" /></a></p>

<p>そんなことで、自分から自分にメンションを送ることで、周りの人もその人のツイートから天気予報の情報を取得できるということになり、結局はこの方法で良かったかなと思っています。</p>

<p>次は夜に次の日の天気をメンションで飛ばす部分を実装しようと思います。</p>

<p>良かったら使ってみてください。</p>
