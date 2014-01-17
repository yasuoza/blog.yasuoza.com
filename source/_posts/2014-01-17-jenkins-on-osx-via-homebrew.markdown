---
layout: post
title: "Jenkins's CSS returns 404 on OSX"
date: 2014-01-17 11:11:20 +0900
comments: true
categories:
- jenkins
- osx
---

## tl;dr
Create tmp directory under `$JENKINS_HOME`

```bash
$ mkdir -p ~/.jenkins/tmpdir
```

Then rewrite `homebrew.mxcl.jenkins.plist` like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>#{plist_name}</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/bin/java</string>
            <string>-Dmail.smtp.starttls.enable=true</string>
            <string>-Dfile.encoding=UTF-8</string>
            <string>-Djava.io.tmpdir=/Users/__USERNAME__/.jenkins/tmpdir</string>
            <string>-jar</string>
            <string>/usr/local/opt/jenkins/libexec/jenkins.war</string>
            <string>--httpListenAddress=127.0.0.1</string>
            <string>--httpPort=8080</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
    </dict>
</plist>
```

As you can see, the point is to set `-Djava.io.tmpdir` to created tmp directory.

Restart jenkins

```bash
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.jenkins.plist
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.jenkins.plist
```


## Description

Sometimes, jenkins on OSX returns 404 status for its CSS. So its layout is broken.

The issue is reported at [JENKINS-17526](https://issues.jenkins-ci.org/browse/JENKINS-17526) and there is a [patch](https://github.com/jenkinsci/jenkins/pull/1061)
for the issue.

To solve the issue jenkins(installed via Homebrew) follow tl;dr section. It should work.
