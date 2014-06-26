---
layout: post
title: "octpress rake new_post wrapper command"
date: 2014-06-26 18:28:21 +0900
comments: true
categories:
---

Save following content as `new-post`.

```bash
#!/usr/bin/env bash

function create () {
	local title=$@
	rake new_post["$title"]
}

function usage() {
	echo "USAGE"
	echo "	new-post 'This is my new post'"
}


if [[ -z $1 ]]; then
  usage
  exit 1
fi

while [ "$1" != "" ]; do
		arg=$1
    case "$arg" in
        -h | --help ) usage
                      exit
                      ;;
        * )           create ${arg[@]}
                      exit
                      ;;
    esac
    shift
done
```

With above command, you can start writing new post via

```
$ new-post 'This is my super entry'
```

:sunglasses::sunglasses::sunglasses:
