---
layout: post
title: "NeoBundleLazy 'VimFiler'"
date: 2014-07-04 18:05:17 +0900
comments: true
categories:
---

To NeoBundleLazy [VimFiler](https://github.com/Shougo/vimfiler.vim), [NeoBundle](https://github.com/Shougo/neobundle.vim) supports `explorer` option.

```vim
NeoBundleLazy 'Shougo/vimfiler.vim', {
\   'depends' : 'Shougo/unite.vim',
\   'autoload' : {
\       'commands' : ['VimFiler', 'VimFilerCurrentDir',
\                     'VimFilerBufferDir', 'VimFilerSplit',
\                     'VimFilerExplorer', 'VimFilerDouble'],
\       'explorer' : 1
\   }
\ }
```

This works with following option!

```vim
let g:vimfiler_as_default_explorer = 1
```

Wow!:heart_eyes:
