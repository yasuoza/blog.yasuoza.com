---
layout: post
title: "Solved unable to install nokogiri to ubuntu 12.04"
date: 2012-12-28 14:10
comments: true
categories:
- ubuntu
---

I tried install nokogiri into my ubuntu 12.04 server, but failed with following error message

```
checking for libxml/parser.h... yes
checking for libxslt/xslt.h... yes
checking for libexslt/exslt.h... yes
checking for iconv_open() in iconv.h... yes
checking for xmlParseDoc() in -lxml2... yes
checking for xsltParseStylesheetDoc() in -lxslt... no
-----
libxslt is missing.  please visit http://nokogiri.org/tutorials/installing_nokogiri.html for help with installing dependencies.
-----
```

[Official install guide page](http://nokogiri.org/tutorials/installing_nokogiri.html) and many other sites said to install `libxslt1-dev`,
but it does not solve my problem.

Ubuntu 12.04 installs `libxslt1-dev` instead of `libxslt-dev`, so I installed libxslt source
code([libxslt-1.1.22](http://www.linuxfromscratch.org/blfs/view/6.3/general/libxslt.html)) and installed by myself.

Then I cloud install nokogiri.
