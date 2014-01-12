---
layout: post
title: Railsでmroongaを使う
categories:
- groonga
- mroonga
- rails
---
昨日行われた<a href="http://atnd.org/events/33070" target="_blank">全文検索エンジンgroongaを囲む夕べ 3 @groonga</a>はUstで見てました。

(g|m|r)roongaに興味を持った人もいるのではないかと思い、mroongaを既存のRailsアプリケーションに導入する方法を紹介しようと思います。

想定は
<ul>
  <li>データベースはMySQLを使っている</li>
  <li>既存のテーブルのカラムに対して全文検索を導入したい</li>
</ul>
という条件です。mroongaはMySQLを必要とするので、そこは必須ですが、新規でmroongaの全文検索カラムを持ったテーブルを作るときにも参考になると思います。

まずはmroongaのインストールをします。公式のドキュメントに綺麗にまとまっているので、そちらを参照して下さい。

<a href="http://mroonga.github.com/docs/install.html" target="_blank">Installation Guide mroonga</a>

インストールしたら次はマイグレーションファイルを作ります。
今回の例ではブログ記事の本文(entry.body)を全文検索するように設定していきます。

```
$ rails g migration use_mroonga_in_entries_table
```

マイグレーションファイルができたらエディタで開いて次のように編集します。

```ruby
class UseMroongaInEntriesTable < ActiveRecord::Migration
  def change
    execute <<-SQL
    ALTER TABLE entries
      ENGINE = mroonga COMMENT = 'engine &quot;innodb&quot;' DEFAULT CHARSET utf8
    SQL

    execute <<-SQL
    ALTER TABLE entries
      ADD FULLTEXT INDEX index_blogs_on_body (body)
    SQL
  end
end
```

マイグレートします。

```
$ rake db:migrate
```

検索します。
```
$ rails c
> Entry.where("match(body) against('hello')")
> [<Entry id: 1, text: "hello world">
```

モデルにはスコープを使って

```ruby
class Entry < ActiveRecord::Base
  scope :search_with, ->(query) { where(%Q(match(body) against("#{query}"))) }

  # attr_accessible is removed.
  # Now we are using strong_parameters!
  # Refer to https://github.com/rails/strong_parameters
end
```

などと書いておけます。<code>query</code>の事前処理は必要に応じてして下さい。僕はいろいろ考えましたが、<code>query</code>の事前処理は呼び出し側のコントローラにやらせることにしてます。

```
$ rails c
> Entry.search_with('hello')
> [<Entry id: 1, text: "hello world">]
```

これでdevelopment環境とproduction環境では、MySQLのエンジンにmroongaが入っていれば動くはずです。
テストを書かない人はここで読み終わってOKです。

ここからはテストを書く人用です。

Railsのテストは都度テスト用DBを初期化するところから始まります。その初期化の過程ではテーブルを空にするだけでなく、<code>db/schema.rb</code>を読んでスキーマを再構築するという処理も含まれます。参考: <a href="http://edgeguides.rubyonrails.org/testing.html#rake-tasks-for-preparing-your-application-for-testing" target="_blank">Rake Tasks for Preparing your Application for Testing</a>
普通ならそれで構わないし、スキーマを再構築してもテストが通るかどうかを確認することは環境に依存しないアプリを作る際に必要になるステップだと思います。
ただ、今回はmroongaを意図的に使うので<code>db/schema.rb</code>を読み込んでスキーマを初期化されては困ります。そこで、<a href="http://kennyj-jp.blogspot.jp/2011/09/specdbtestprepare.html" target="_blank">kennyjさんのブログ記事</a>で紹介されていた方法を取ります。

Rakefileに以下を追加
```ruby
Rake::TaskManager.class_eval do
  def remove_task(task_name)
    @tasks.delete(task_name.to_s)
  end
end
```

lib/tasks/override_db_test_prepare.rbを作成
```ruby
Rake.application.remove_task 'db:test:prepare'

namespace :db do
  namespace :test do
    task :prepare do; end
  end
end
```

これでrake db:test:prepareで何も処理されないようにすることで<code>db/schema.rb</code>の内容でテスト用DBが上書きされずに済むようになります。

ここまで来たらテスト用にDBを用意してテストを走らせるだけです。
```
$ rake db:migrate RAILS_ENV=test
$ rake spec  # rake test
```

fluentdを使ってgroongaのshardingが出来るようになったりいろいろ進化していくgroonga注目です。
