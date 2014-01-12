---
layout: post
title: "Trigger jenkins from Gitlab push hook"
date: 2013-08-08 09:10
comments: true
categories:
- gitlab
- jenkins
---

Jenkins is awesome secretary and my friend. I can't live without him.  
My Jenkins does these things:

* Deploy blog.yasuoza.com
* Test my private repositories
* Cron jobs

This blog and some private repositories are hosted by my [Gitlab](http://gitlab.org/).

Today I want to share how to build job via Gitlab push hook with concrete example: how to deploy [Octopress](http://octopress.org/) blog with Giatlab.

First, you need to configure Octopress with rsync deployment. See more: [Configuring Octopress](http://octopress.org/docs/configuring/)

Next, set jenkins's public key to blog server so that jenkins can login the server without password.

```plain
$ sudo -u jenkins -H ssh user@yourhost.com
```

Then, install Jenkins plugin [Gitlab Hook Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Gitlab+Hook+Plugin) and set `http://your-jenkins-server/gitlab/build_now`
in your Gitlab like this:

{% img /images/jenkins_gitlab_hook_plugin.png %}

This plugin works even if jenkins requires authentication to enter jenkins home.

** NOTE **  
Gitlab Hook Plugin v0.2.11 does not work well when the job is not parameterized. So, use >= v0.2.12.  
For more: [Build no longer triggering (Maybe running too bleeding edge?)](https://github.com/elvanja/jenkins-gitlab-hook-plugin/issues/15)


Finally, configure Jenkins job to deploy Octopress:

```plain Execute shell
bundle
bundle exec rake generate
bundle exec rake deploy
```

** NOTE **  
OCTOPRESS REQUIRES RUBY 1.9.3-P194.  
Ensure to jenkins's ruby version is 1.9.3-p194 or use ruby version management framework such as rvm or rbenv.  
If you want to let jenkins run not only system ruby, I recomend you to use [rbenv plugin](https://wiki.jenkins-ci.org/display/JENKINS/Rbenv+Plugin).  
It is easy to use.


Well, you done. Now push changes to your own Gitlab. Jenkins works for you.
