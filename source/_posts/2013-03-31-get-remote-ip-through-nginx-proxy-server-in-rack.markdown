---
layout: post
title: "Get remote ip through nginx proxy server in rack"
date: 2013-03-31 22:07
comments: true
categories:
  - nginx
  - rack
---

When developer wants to filter request based on remote ip, he will do like this

```ruby sinatra_server.rb
get '/' do
  return 403 if request.ip != desired_request_ip

  "OK!"
end
```

If you're using tcp socket in nginx proxy server it will be good, but if you're using unix
socket proxy server, `remote.ip` will be 127.0.0.1. Because the request proxied.

But, `rack` treat `request.ip` very well in [request.rb](https://github.com/chneukirchen/rack/blob/master/lib/rack/request.rb#L352-L367)
The only thing you have to do is set `X-Forwarded-For` and `CLIENT_IP` and `X-Real-IP` precisely.

```nginx site.nginx.conf
upstream pretty_site {
  server unix:/tmp/pretty_site.sock;
}

server {
  listen 80;         # e.g., listen 192.168.1.1:80;
  server_name pretty.yoursite.com;     # e.g., server_name source.example.com;

  root /home/www/pretty_site;

  # individual nginx logs for this pretty_site vhost
  access_log  /var/log/nginx/pretty/access.log;
  error_log   /var/log/nginx/pretty/error.log;

  location / {
    # serve static files from defined root folder;.
    # @pretty_site is a named location for the upstream fallback, see below
    try_files $uri $uri/index.html $uri.html @pretty_site;
  }

  # if a file, which is not found in the root folder is requested,
  # then the proxy pass the request to the upsteam (pretty_site unicorn)
  location @pretty_site {
    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_redirect     off;

    # 'X-Forwarded-For' header is required for rack request.ip
    # https://github.com/chneukirchen/rack/blob/master/lib/rack/request.rb#L352-L367
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   CLIENT_IP         $remote_addr;

    proxy_pass http://pretty_site;
  }
}
```

Then you can get `request.ip` as you want.
