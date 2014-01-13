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
- git config --global user.name "_username_(via Travis CI)"
- git config --global user.email "youremail@gmail.com"
- git remote set-url origin $REPO.git
# array length 23 is calculated later as $RSA_LENGTH
- if [ -z "$id_rsa_{1..23}" ]; then echo 'No $id_rsa_{1..23} found !' ; exit 1; fi
- echo -n $id_rsa_{1..23} >> ~/.ssh/travis_rsa_64
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
  - REPO="git@github.com:_username_/_repository_"
```

Encrypt ssh-key via base64.

```bash
# On a Mac, use this script to generate secure deployment key
$ base64 --break=0 ~/.ssh/travis_rsa > ~/.ssh/travis_rsa_64

# If in linux
# base64 --wrap=0 ~/.ssh/travis_rsa > ~/.ssh/travis_rsa_64

$ bash <(cat ~/.ssh/travis_rsa_64 | perl -pe 's/(.{100})/$1\n/g' | nl | perl -pe 's/\s*(\d+)\s*(.*)/travis encrypt id_rsa_$1="$2" --add/')
```

Count `id_rsa_{1..$RSA_LENGTH}`.

```bash
$ cat ~/.ssh/travis_rsa_64 | perl -pe 's/(.{100})/$1\n/g' | nl | tail
```

Finally, you should apply following patch to `rake deploy` to pulls from origin #{deploy_branch}.

```diff
--- a/Rakefile
+++ b/Rakefile
@@ -248,8 +248,8 @@ desc "deploy public directory to github pages"
 multitask :push do
   puts "## Deploying branch to Github Pages "
   puts "## Pulling any updates from Github Pages "
-  cd "#{deploy_dir}" do
-    system "git pull"
+  cd "#{deploy_dir}" do
+    system "git pull origin #{deploy_branch}"
   end
   (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
   Rake::Task[:copydot].invoke(public_dir, deploy_dir)
```

That's it. Connect blog repository to Travis CI, and commit change!

Refs:  
- http://pchw.github.io/blog/2013/06/27/octopress-travis/  
- http://www.harimenon.com/blog/2013/01/27/auto-deploying-to-my-octopress-blog/
