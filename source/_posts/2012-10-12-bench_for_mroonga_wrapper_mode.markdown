---
layout: post
title: mroongaラッパーモードのベンチマーク
tags:
- mroonga
- mysql
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
---
MySQLで全文検索をさせたくて、
<ul>
	<li>素のカラム</li>
	<li>MySQL(inonDB)のインデックス</li>
	<li>高速な全文検索エンジン<a href="http://mroonga.github.com/" target="_blank">mroonga</a>のラッパーモード</li>
</ul>
のそれぞれに対して対して全文検索を行い、そのベンチマークを取りました。

テーブル定義文
<script src="https://gist.github.com/3873106.js?file=create_bench.sql"></script>

ベンチマーク実行プログラム```mysqlカラムの検索ワード頭に%を付けないのはインデックスを使った検索を有効にするためです```
<script src="https://gist.github.com/3873106.js?file=bench_mroonga.rb"></script>

結果
<pre>
       user     system      total        real
   0.180000   0.090000   0.270000 ( 45.093617) #素のカラム
   0.050000   0.030000   0.080000 (  1.081635) #MySQLインデックス
   0.040000   0.030000   0.070000 (  1.024571) #mroonga
</pre>

となり、mroongaがMySQLのインデックスよりも高速に検索を行なっている事がわかりました。


mroongaのラッパーモードの良さは速度だけではなくその導入のしやすさにあると思います。
mroongaのインストールの方法は<a href="http://mroonga.github.com/ja/docs/install.html#mac-os-x" target="_blank">公式のインストールガイド</a>に詳しく載っていますし、既存のテーブルをmroongaのラッパーモードに変更したい時は<a href="http://nob-log.info/2012/03/22/install-mroonga/" target="_blank">全文検索エンジンmroonga導入の試行錯誤</a>で説明されている通り
```
ALTER TABLE _table_name_ ENGINE = mroonga COMMENT = 'engine &quot;innodb&quot;' DEFAULT CHARSET utf8;
```
のように記述することで変更可能です。
ここらへんのことは<a href="http://mroonga.github.com/ja/docs/reference.html" target="_blank">公式のリファレンス</a>にきちんとまとめられているので、そっちを見るといいと思います。

レンタルサーバを借りている人や、自分のサーバを持っている人はRails + Active Admin + mroongaで自分や特定の範囲の人用に高速で検索できる情報共有システムを簡単に作れそうです。
mroongaすごいなー。
