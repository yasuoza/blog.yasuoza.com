---
layout: post
title: "Kawaii merge diffs in tig"
date: 2014-02-17 10:58:07 +0900
comments: true
categories:
- git
- tig
---

Tig's original merge diffs looks like this:

{% img center /images/2014/02/original_tig_merge.png %}

But I WANT to see merge diff like GitHub's merge diff like:

{% img center /images/2014/02/gh_merge_diff.png %}

This is enabled via [tig@8370101fa](https://github.com/jonas/tig/commit/8370101fa9f46d814cef724b65b08e83a2a52e8e).

To power this commit, install tig-HEAD.

```bash
$ git clone https://github.com/jonas/tig.git
$ cd tig
$ brew install autoconf           # If you are using OSX
$ # sudo apt-get install autoconf # If you are using Debian
$ make configure                  # This step requires 'autoconf' package
$ ./configure
$ make
$ make install
```

After installation, open `~/.tigrc` and set following option.

```text
set diff-options = -m --first-parent
```

Then, merge diffs in tig will be:

{% img center /images/2014/02/kawaii_tig_merge.png %}

It's Kawaii :heart_eyes:
