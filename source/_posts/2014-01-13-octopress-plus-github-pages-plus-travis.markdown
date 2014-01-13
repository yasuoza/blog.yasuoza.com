---
layout: post
title: "Octopress + GitHub Pages + Travis"
date: 2014-01-13 15:57:31 +0900
comments: true
categories:
- travis
- octopress
- GitHub
---

Today I changed my blog generation CI from jenkins to Travis CI.

Following step shows how to make it. Suppose you are in project root.

First, install travis command from rubygems.

```bash
$ gem install travis
```

Generate ssh-key accessible to only blog repository.

```bash
$ ssh-keygen -t rsa -C 'youremail@examp.com' -f ~/.ssh/travis_rsa

# Copy public key to clipboard
$ cat ~/.ssh/travis_rsa.pub | pbcopy

# Set copied public key to deploy key in GitHub
$ open  https://github.com/_username_/_repository_/settings/keys
```

Then, setup `.travis.yml` like:

```yaml
language: ruby
rvm:
- 2.1.0
branches:
  only:
  - master
before_script:
- git config --global user.name "yasuoza(via Travis CI)"
- git config --global user.email "yasuharu.ozaki@gmail.com"
- git remote set-url origin $REPO.git
- for (( i=0; i<=$RSA_LENGTH; i++ )); do eval "echo -n \$id_rsa_$i >> ~/.ssh/travis_rsa_64"; done
- base64 --decode --ignore-garbage ~/.ssh/travis_rsa_64 > ~/.ssh/id_rsa
- chmod 600 ~/.ssh/id_rsa
- echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
- bundle exec rake setup_github_pages[$REPO]
- git checkout -- _config.yml
script:
- bundle exec rake generate
after_script:
- bundle exec rake deploy
env:
  global:
  - REPO="git@github.com:_username_/_repository_.git"
```

Encrypt ssh-key via base64.

```bash
# On a Mac, use this script to generate secure deployment key
$ base64 --break=0 ~/.ssh/travis_rsa > ~/.ssh/travis_rsa_64

# If in linux
# base64 --wrap=0 ~/.ssh/travis_rsa > ~/.ssh/travis_rsa_64

$ bash <(cat ~/.ssh/travis_rsa_64 | perl -pe 's/(.{100})/$1\n/g' | nl | perl -pe 's/\s*(\d+)\s*(.*)/travis encrypt id_rsa_$1="$2" --add/')
```

Count `id_rsa_{1..$RSA_LENGTH}` and encrypt it.

```bash
$ cat ~/.ssh/travis_rsa_64 | perl -pe 's/(.{100})/$1\n/g' | nl | tail
$ travis encrypt RSA_LENGTH=50 --add # Assume last value was 50
```

That's it. Connect blog repository to Travis CI, and commit change!

Refs:

- http://pchw.github.io/blog/2013/06/27/octopress-travis/  
- http://www.harimenon.com/blog/2013/01/27/auto-deploying-to-my-octopress-blog/
