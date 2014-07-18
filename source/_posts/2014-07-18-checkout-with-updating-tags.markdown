---
layout: post
title: "checkout with updating tags"
date: 2014-07-18 19:55:05 +0900
comments: true
categories:
---

When writing middle - big application, `tags` is very useful to find method and variable definition.
Especially for RoR application, `ripper-tags` is useful and it would be great if update tags when `git checkout`.

Here is the solution.

```bash
touch .git/hooks/post-checkout
chmod +x .git/hooks/post-checkout
```

post-checkout will be

```
#!/bin/sh

if [ -z $SKIP_TAG ]; then
	ripper-tags -R --exclude='test' --exclude='spec' --exclude='vendor/bundle'
fi
```

If you don't want to update tags when checkout, simply export `SKIP_TAG` environment variable.
