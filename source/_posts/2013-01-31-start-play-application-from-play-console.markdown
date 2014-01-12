---
layout: post
title: "Start play application within play console"
date: 2013-01-31 16:22
comments: true
categories:
- playframework
---
Sometime you're playing play framework, you will want to simulate play application like `rails console`.

First, start play console with auto evolution mode.

```
$ play -DapplyEvolutions.default=true console
```

And start your application.

```
scala> import play.core.StaticApplication

scala> new StaticApplication(new java.io.File("."))
```

Then, you can do what you want.

source: [[2.0] how to start application from play console](https://groups.google.com/forum/?fromgroups=#!topic/play-framework/EFYnWC1yYsg)
