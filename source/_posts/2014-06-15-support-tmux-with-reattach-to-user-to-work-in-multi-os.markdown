---
layout: post
title: Support tmux with "reattach-to-user-namespace" to work in multi OS
date: 2014-06-15 17:44:32 +0900
comments: true
categories:
---

When using tmux with 'reattach-to-user-namespace' to enable clipboard copy paste support in OSX, you may have `~/.tmux.conf`

```
set-option -g default-command "reattach-to-user-namespace -l zsh"
```

However with this configuration, tmux will fails on another platforms such as linux when reattach-to-user-namespace not installed.

So, your have at least 2 option to prevent it.

- Prepare another `~/.tmux.conf`.
- Detect OS and use another `default-command` for each OS.

First option is easy but dull. Who wants to write same content but very last line?

Second option seems not to be easy, but IS easy. You can do like:

### Detect OS pattern

`~/.tmux.conf`

```
if-shell 'test "$(uname -s)" = Darwin' 'set-option -g default-command "exec reattach-to-user-namespace -l zsh"'
```

### Detect OS and load os specific configuration file pattern

`~/.tmux.conf`

```
if-shell 'test "$(uname -s)" = Darwin' 'source-file $HOME/.tmux-osx.conf'
```

and `~/.tmux-osx.conf`

```
set-option -g default-command 'exec reattach-to-user-namespace -l zsh'
```

That's it!

Read more:

[ChrisJohnsen/tmux-MacOSX-pasteboard/Usage.md](https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard/blob/master/Usage.md)
