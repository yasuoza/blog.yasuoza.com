---
layout: post
title: Chromeのfaviconのキャッシュをクリアする
tags:
- chrome
- ruby
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
いろんなフレームワークでWebアプリケーションを開発していると、localhost:3000やlocalhost:8080などで動作検証することが多くなります。
その検証ページで前のアプリケーションのfaviconが表示され続けてとても邪魔だったので、調べたら特定のURLのfaviconのキャッシュだけ削除する方法が紹介されてました。

<a href="http://d.hatena.ne.jp/hokaccha/20120106/1325829511" target="_blank">chromeで特定のfaviconのキャッシュを削除する - hokaccha.hamalog v2</a>

faviconのキャッシュはsqliteで管理されているので、そこからデータを消すだけでOKらしい。

実際にやってみると確かに消えている。ただし、Chromeを終了した状態じゃないとFaviconsデータベースがロックされていて削除できなかったので、削除するときはあらかじめChromeを終了しておく。

いちいちsqlite3からSQL文発行するの面倒だったので、スクリプト書きました。
URLにlocalhostが含まれるもののfaviconを削除するようにしました。

```
require 'sqlite3'

library_path = File.join(ENV['HOME'], '/Library/Application Support/Google/Chrome/Default')
db_file_path = File.join(library_path, 'Favicons')

db = SQLite3::Database.new db_file_path

begin
  command = &quot;delete from favicons where url like '%localhost%'&quot;
  p &quot;Will execute: #{command}&quot;
  db.execute(command)
  p &quot;Done: #{command}&quot;
rescue SQLite3::BusyException =&gt; ex
  print &lt;&lt;-ERROR_DOC
  Is Chrome.app runnig?
  Then quit Chrome.app first.
  ERROR_DOC
end
```

手元のchrome v.21で動作確認しました。
