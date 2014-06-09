---
layout: post
title: "remove_const vs stub_const"
date: 2014-06-09 21:51:16 +0900
comments: true
categories:
---

If you're writing test with rspec, sometime you want to CHANGE constants like

```ruby
# foo.rb
class Foo
  BAR = 'bar'
end

# foo_spec.rb
describe Foo do
  it 'have constant BAR' do
    expect(Foo.BAR).to be '???'
  end
end
```

You can choose many ways to change constants.

### remove_const

First options is to use `Module#remove_const`.

```ruby
# foo_spec.rb
describe Foo do
  before do
    @__orig_bar = Foo::BAR.dup
    Foo.send(:remove_const, :BAR)
    Foo::BAR = '???'
 end

 after do
    # restore to original constant.
    # without this, Foo::BAR remains '???'
    Foo.send(:remove_const, :BAR)
    Foo::BAR = @__orig_bar  
 end

  it 'have constant BAR' do
    expect(Foo::BAR).to eq '???'
  end
end
```

The merit of this way is to change constants completely and the constant is evaluated directly.
Adding to it, this method works without any libraries.  
The demerit of this way is that this is something like META programming. This may not be easy to understand for ruby beginner.

### stub_const

Second option is to use `stub_const` defined in [rspec-mocks](https://github.com/rspec/rspec-mocks).

```ruby
# foo_spec.rb
describe Foo do
  before do
    # no need to restore.
    # It restores after Foo example finished.
    stub_const('Foo::BAR', '???')
  end

  it 'have constant BAR' do
    expect(Foo::BAR).to eq '???'
  end
end
```

The merit of this way is easy to setup and easy to understand.  
Ths demerit of this way is that `stub_const` depends on rspec-mocks, so if you want to use `stub_const` with minitest,
you have to HACK minitest.

### conslusion

Chosing `remove_const` vs `stub_const` depends on your situation. I think if the constant is important for buisiness logic,
you should choose `remove_const`. If the constant is no so important testing and using rspec, you choose `stub_const`.  
I think this discussion has no goal, but I think having many options is one of the the ways to be a HACKER.

