---
layout: post
title: "Docker in OSX without dvm"
date: 2014-01-10 11:35:08 +0900
comments: true
categories:
- docker
- mac
---

Docker client for OSX released as of [0.7.3](https://github.com/dotcloud/docker/blob/master/CHANGELOG.md#073-2014-01-02)

Now, we OSX user can access docker container without ssh command by followlig without [dvm](http://fnichol.github.io/dvm/)

Install docker client via Homebrew:

```bash
$ brew update
$ brew tap homebrew/binary
$ brew install docker
```

Next, setup Vagrantfile like:

```ruby
DOCKER_IP   = ENV["DOCKER_IP"]   || "192.168.42.43"
DOCKER_PORT = ENV["DOCKER_PORT"] || 4243

Vagrant.configure("2") do |config|
  config.vm.box     = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  config.vm.network :private_network, ip: DOCKER_IP
  config.vm.provision :docker do |d|
    d.pull_images "base"
  end
  config.vm.provision :shell, inline: <<-SHELL
    sudo sed -i -e 's/DOCKER_OPTS=/DOCKER_OPTS=\"-H #{DOCKER_IP}:#{DOCKER_PORT}\"/g' /etc/init/docker.conf
    sudo service docker restart
  SHELL
end
```

Then run VM:

```bash
$ vagrant up
```

Export `DOCKER_HOST`:

```bash
$ export DOCKER_HOST="192.168.42.43:4243" # DOCKER_HOST="$DOCKER_IP:$DOCKER_PORT"
```

That's all. Now you can access docker container like:

```bash
$ docker run base echo "hello world!"
```
