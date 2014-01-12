---
layout: post
title: "Trigger authenticated jenkins job"
date: 2013-01-02 22:33
comments: true
categories:
- jenkins
---

Trigger job in authenticated jenkins using ruby!

```ruby
require 'net/http'

server = 'https://your.jenkins.com'
jobname = 'your_jobname'
build_token = 'job_build_token'

user = 'you'
user_token = 'your_token'

uri = URI("#{server}/job/#{jobname}/build?token=#{build_token}&cause=remote+trigger")

request = Net::HTTP::Get.new(uri.request_uri)
request.basic_auth user, user_token

res = Net::HTTP.start(uri.hostname,
                      uri.port,
                      use_ssl: uri.scheme == 'https') { |http|
  http.request(request)
}

p "#{res.code}: #{res.msg}"
```

If you use your 'own' ssl certification, ignore `Certificate verify failed` with `OpenSSL::SSL::VERIFY_NONE` option like this

```ruby
res = Net::HTTP.start(uri.hostname,
                      uri.port,
                      use_ssl: uri.scheme == 'https',
                      verify_mode: OpenSSL::SSL::VERIFY_NONE) { |http|
  http.request(request)
}
```
