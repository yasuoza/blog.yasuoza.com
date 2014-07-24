---
layout: post
title: "checkout with updating tags"
date: 2014-07-18 19:55:05 +0900
comments: true
categories:
---

When writing middle - big application, `tags` is very useful to find method and variable definition.
Especially for RoR application, `ripper-tags` is useful and it would be great if update tags when `git checkout`.

Here is the opt out solution.

```bash
touch .git/hooks/post-checkout
chmod +x .git/hooks/post-checkout
```

post-checkout will be

```
#!/bin/sh

if [[ -n $SKIP_TAG || $SKIP_TAG != 1 ]]; then
	ripper-tags -R --exclude='test' --exclude='spec' --exclude='vendor/bundle'
fi
```

If you don't want to update tags when checkout, simply set `SKIP_TAG` environment variable to 1 like

```bash
SKIP_TAG=1 git checkout your_branch
```

### Opt in

```
#!/bin/sh

if [[ -n $UPDATE_TAG && $UPDATE_TAG == 1 ]]; then
	ripper-tags -R --exclude='test' --exclude='spec' --exclude='vendor/bundle'
fi
```

```bash
UPDATE_TAG=1 git checkout your_branch
```
