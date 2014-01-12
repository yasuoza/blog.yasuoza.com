---
layout: post
title: nginxのFastCGI実行設定
tags:
- FCGI
- nginx
- Plack
- WebDevelopment
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _sd_is_markdown: ''
  _syntaxhighlighter_encoded: '1'
---
PerlのPlackでサービスを作っていて、FastCGIとnginxを繋ぐ設定で結構時間がかかったので、備忘録を。


Plackは<a href="http://plackperl.org/" title="Plack" target="_blank">Plack</a>を、FastCGI(FCGI)は<a href="http://test.fastcgi.com/drupal/" target="_blank">FastCGI</a>を参照して下さい。


基本的には<a href="http://search.cpan.org/~miyagawa/Plack-0.9986/lib/Plack/Handler/FCGI.pm" target="_blank">ここ</a>に載っていることの丸写しですが、Debianだとfastcgi_paramsが別ファイル管理されているので、そのファイルを読み込みます。

というわけでこんな感じ。

```
server {
  listen: 80;
  server_name foobar.com;

  location / {

    fastcgi_pass   unix:/tmp/fastcgi.sock;

    include /etc/nginx/fastcgi_params;
    fastcgi_params  SCRIPT_NAME &quot;&quot;;
    fastcgi_params  PTH_INFO    $fast_script_name;
  }

}
```

```
$ plack -s FCGI --listen /tmp/fastcgi.sock plack.pl
```
でサーバを起動し、
http://foobar.com にアクセスして、正しい内容が表示されていればOKです。
