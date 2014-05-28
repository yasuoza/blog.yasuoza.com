---
layout: post
title: "Stub sharedManager with OCMock"
date: 2014-05-28 22:29:24 +0900
comments: true
categories:
- objective-c
---

If you are iOS/Mac developer, you may have written singleton like following convention:

```objc
static UserModelManager *sharedManager_ = nil;

+ (UserModelManager *)sharedManager {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedManager_ = [[UserModelManager alloc] init];
    });
    return sharedManager_;
}
```
If `UserModelManager` has `secretKey` instance method like:

```objc
- (NSString *)secretKey
{
    return "secret key provided from server side";
}
```

Then you can call `hello` method via

```objc
[[UserModelManager sharedManager] secretkey];
```

It's OK until you have to stub `secretKey` in a test.

The solution to stub `sharedManager` and `secretkey` is:

```objc
_mockUserModelManager = [OCMockObject niceMockForClass:[UserModelManager class]];
[[[_mockUserModelManager stub] andReturn:@"test-key"] secretkey];
[[[[_mockUserModelManager stub] classMethod] andReturn:_mockUserModelManager] sharedManager];
```

To clean up your stub methods, DO NOT forget `stopMocking` in `tearDown`.

```
- (void)tearDown
{
	[super tearDown];

	[_mockUserModelManager stopMocking];
}
```
