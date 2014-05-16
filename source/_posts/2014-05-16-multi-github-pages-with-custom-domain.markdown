---
layout: post
title: "Multi GitHub pages with custom domain"
date: 2014-05-16 23:31:42 +0900
comments: true
categories:
---

I have two GitHub pages

- [YasuOza's website](http://www.yasuoza.com/)
- [yasuoza diary](http://blog.yasuoza.com/)

each sites are hosted by [GitHub pages](https://pages.github.com/) using [custom domain](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages).

To use custom domain for GitHub pages, create `CNAME` file and write like:

```
www.yasuoza.com
```

With this file, you can see domain setting on Github repository > Settings > GitHub Pages like:

{% img /images/2014/05/settings-github-pages.png %}

Next, open your DNS configure page, setup like:

{% img /images/2014/05/githubpages-dns.png %}

Wait 1~3 hours(depend on you DNS server or environment).

Then open teminal and type like:

```bash
$ dig www.example.com +nostats +nocomments +nocmd
;www.example.com.                     IN      A
www.example.com.              3592    IN      CNAME   username.github.io.
username.github.io.           43192   IN      CNAME   github.map.fastly.net.
github.map.fastly.net.        22      IN      A       199.27.76.133
```

### Tips

If you publish _username_.github.io repository to _www.yoursite.com_, then GitHub redirects
_username.github.io_ to _www.yoursite.com_.  
However, if you publish _another_ repository to _subdomain.yoursite.com_, GitHub does not redirect
_www.yoursite.com/another_ to _subdomain.yoursite.com_.  
If you want to redirect _www.yoursite.com/another_ to _subdomain.yoursite.com_, you should write
redirect JavaScript like:

```javascript
(function() {
	 var GITHUB_PAGES_HOST = 'www.yoursite.com';
	 if (document.location.host === GITHUB_PAGES_HOST) {
		 document.location.href = document.location.href.replace(GITHUB_PAGES_HOST, '');
	 }
}());
```

Then _www.yoursite.com/another_ will be redirected to _subdomain.yoursite.com_.  
Cheers:sunglasses:
