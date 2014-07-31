---
layout: post
title: "I'm a hub immigrant"
date: 2014-07-31 19:10:49 +0900
comments: true
categories:
---

I'm using GitHub for job and my code hosting.
Especially for co-working project, PullRequest based development is very useful to maintain codes clean.

Using git in terminal, to submit PullRequest,

- Push remote
- Open GitHub
- Write PR's description
- Submit

workflow is necessaly. But with [hub](https://github.com/github/hub), you can submit PR within terminal only with

    git pull-request

command.

Those days I used Ruby based hub, but changed to use [gh](https://github.com/jingweno/gh) Go based hub replacer because of its speed.
And now I'm using hub build with Go! Yes, hub is going to be developed with Go in the [future](https://github.com/github/hub/issues/475#issuecomment-50217006)!

To start using hub with Go,

```bash
git clone git@github.com:github/hub.git -b gh
cd hub
./script/bootstrap
./script/build
```

Then you can see executable `hub` binary at the root of the project. Copy or symlink the executable to your `$PATH`.

Have a Happy GitHub life!
