---
layout: post
title: "Kawaii git diff in my local repository"
date: 2013-11-21 22:34:55 +0900
comments: true
categories:
- git
---

Diff on GitHub is super :heart_eyes: to me because it shows method name.  
This post shows how to make it in local repository.

For example, GitHub shows diff with `def is_repo?`.
![Screen Shot 2013-11-21 at 7.17.20 PM.png](https://qiita-image-store.s3.amazonaws.com/0/4402/34d6ecf8-7437-b881-b1ff-80c90ec1689d.png)
https://github.com/github/hub/commit/87050ce94a97b0c382b99c975bde0c833332b38e

Normal local diff looks like this :confounded:
![Screen Shot 2013-11-21 at 7.20.04 PM.png](https://qiita-image-store.s3.amazonaws.com/0/4402/b4942b6f-b522-50ac-3a7a-2234b55760b4.png)

The answer is:
```text .gitattributes
*.rb diff=ruby
```

My local diff is now :heart_eyes:
![Screen Shot 2013-11-21 at 7.29.07 PM.png](https://qiita-image-store.s3.amazonaws.com/0/4402/b02ab578-b778-048b-5607-877ae8a41ece.png)


Following `diff`s are available.  
 http://git-scm.com/docs/gitattributes#_defining_a_custom_hunk-header

**2013/11/24 UPDATE**  
If you want to define `diff`s globally, define like following:
```text ~/.gitconfig
[core]
      attributesfile = ~/.gitattributes_global
```

```text ~/.gitattributes_global
*.rb diff=ruby
```
