---
layout: post
title: Chrome拡張のRetina対応
tags:
- chrome
- extension
- retina
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
前に出していたChrome拡張をRetinaディスプレイに対応させました。

<a href="https://chrome.google.com/webstore/detail/fast-note/jehbplmdjbmcbbdlghcphdhfakcgaiaj" target="_blank">Chrome ウェブストア - Fast Note</a>


Before
<img src="/images/2012/11/Screen-Shot-2012-11-12-at-10.01.47-PM.png" alt="" title="Screen Shot 2012-11-12 at 10.01.47 PM" width="198" height="118" class="thumbnail alignnone size-full wp-image-337" />

After
<img src="/images/2012/11/Screen-Shot-2012-11-12-at-10.02.21-PM.png" alt="" title="Screen Shot 2012-11-12 at 10.02.21 PM" width="194" height="120" class="thumbnail alignnone size-full wp-image-338" />



参考にしたのは

<a href="https://chrome.google.com/webstore/detail/google-docs-viewer-by-goo/kkjmcfdcdbbkdacicmpokoddagejpknh" target="_blank">Google Docs Viewer (by Google)</a>


Chrome拡張をRetina対応するには次のようにmanifest.jsonの<code>default_icon</code>を48x48にします。

```
&quot;browser_action&quot;: {
   &quot;default_icon&quot;: &quot;logo48.png&quot;,
}
```

48x48のサイズは必須(<a href="http://developer.chrome.com/extensions/manifest.html#icons" target="_blank">Formats: Manifest Files - Google Chrome</a>)なのですでに手元にあると思います。
これだけです。

なお、manifest.jsonでmanifest_versionを2に設定しなければなりません。manifest_version 1 はサポートが打ち切られ、検索結果に出なくなったり、最終的に2013年3/4から動かなくなります。詳しくは <a href="http://developer.chrome.com/extensions/manifestVersion.html" target="_blank">Manifest Version - Google Chrome</a> を参照して下さい。

Retinaディスプレイはテキストとか非常にきれいなんですが、Retina非対応なサイトだと特に画像の荒さが目立って逆に見づらいです。

次回はWebサイトのRetina対応について書こうと思いますー。
