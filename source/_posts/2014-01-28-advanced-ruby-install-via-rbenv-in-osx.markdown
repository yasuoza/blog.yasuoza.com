---
layout: post
title: "Advanced ruby install via rbenv in OSX"
date: 2014-01-28 13:25:51 +0900
comments: true
categories:
- ruby
---

**Parallel compile**

```
$ MAKE_OPTS="-j 4" rbenv install 2.1.0
```

Above example compiles ruby with 4 workers.

**Readline support**

```
$ brew install readline
$ RUBY_CONFIGURE_OPTS=--with-readline-dir=`brew --prefix readline` rbenv install 2.1.0
```

Mixed

```
$ MAKE_OPTS="-j 4" RUBY_CONFIGURE_OPTS=--with-readline-dir=`brew --prefix readline` rbenv install 2.1.0
```
