---
layout: post
title: "Array#compact in CoffeeScript"
date: 2012-12-14 17:05
comments: true
categories:
- CoffeeScript
---

```coffeescript
Array::compact = ->
  (elem for elem in this when elem?)

arr = [0..10]
delete arr[7]
delete arr[8]

console.log arr.compact() #=> [0, 1, 2, 3, 4, 5, 6, 9, 10]
```

Yeah!
