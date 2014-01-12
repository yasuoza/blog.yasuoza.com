---
layout: post
title: "Set another IP on scalatra spec"
date: 2013-01-22 11:23
comments: true
categories:
- scala
---

When filtering client IP on scalatra, the following code will work

```scala
get("/") {
  if (!ConfigData.allowedIP.contains(request.remoteAddress)) {
    halt(403, "Forbbiden")
  }
  scaml("hello-scalate")
}
```

Spec file will be like this

```scala
"GET / on MyServlet from 127.0.0.1" should {
  "return status 200" in {
    get("/", Seq.empty, Map("X-FORWARDED-FOR" -> "127.0.0.1")) {
      status must_== 200
    }
  }
}
"GET / on MyServlet from 0.0.0.0" should {
  "return status 403" in {
    get("/", Seq.empty, Map("X-FORWARDED-FOR" -> "0.0.0.0")) {
      status must_== 403
    }
  }
}
```
