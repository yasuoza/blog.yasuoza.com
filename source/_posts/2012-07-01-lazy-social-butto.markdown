---
layout: post
title: 非同期ソーシャルボタン
tags:
- JavaScript
- jQuery
- Plugin
- WebDevelopment
status: publish
type: post
published: true
meta:
  _sd_is_markdown: '1'
  _edit_last: '1'
---
<p>facebookやツイッターのソーシャルボタンをサイトに置くことが多くなってきています。
特にサイトのトップページや、ニューストップページには記事の見出しごとにソーシャルボタンを配置したりして、
かなりページの読み込みが遅くなってしまっているページを良く見かけます。</p>

<p>そこで、初期のページ読み込み時にはソーシャルボタンは読み込まず、ユーザがソーシャルボタンを押す動作を
した時に非同期でソーシャルボタンを読み込むようにするjQueryのスニペットを書きました。</p>

<p>デモは次のページで見ることができます。
<a href="http://www.yasuoza.com/jq_plugin/lazy_sb/" target="_blank">Demo</a></p>

<p>詳しくはgistを参照して下さい。
<a href="https://gist.github.com/3027177" target="_blank">Lazy share button (jQuery plugin)</a></p>

<p>基本的にはTechCrunchのコードを参考にしましたが、最適化を施したり、はてなブックマークにも対応しました。
良ければ使って下さい。</p>
