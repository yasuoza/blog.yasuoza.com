---
layout: post
title: "How do you indent ruby's if..else assignment?"
date: 2014-07-02 14:35:37 +0900
comments: true
categories:
---

There are several ways to write `if...else` variable assignment.

```ruby
@products = if params[:category]
              Category.find(params[:product]).products
            else
              Products.all
            end
```

```ruby
@products = if params[:category]
  Category.find(params[:product]).products
else
  Products.all
end
```

```ruby
@products = if params[:category]
    Category.find(params[:product]).products
  else
    Products.all
  end
```

```ruby
@products =
  if params[:category]
    Category.find(params[:product]).products
  else
    Products.all
  end
```

Which one do you prefer?

I prefer last one. Because this can keep horizontal length much smaller and [vim-ruby](https://github.com/vim-ruby/vim-ruby)'s auto indent also supports this syntax.

FYI:
http://stackoverflow.com/questions/8745299/recommended-indentation-style-for-ruby-if-blocks-that-assign-a-value-to-a-vari
http://stackoverflow.com/questions/2925028/how-do-you-assign-a-variable-with-the-result-of-a-if-else-block
