---
layout: post
title: "Swift can't retrieve data from keychain on Release build"
date: 2015-01-31 15:45:44 +0900
comments: true
categories:
- swift
---

With, swift, we can(should) retrive data like

```
var keychainQuery: NSMutableDictionary = NSMutableDictionary(
    objects: [
      kSecClassGenericPasswordValue,
      service,
      key,
      kCFBooleanTrue,
      kSecMatchLimitOneValue
    ],
    forKeys: [
      kSecClassValue,
      kSecAttrServiceValue,
      kSecAttrAccountValue,
      kSecReturnDataValue,
      kSecMatchLimitValue
    ]
)

var dataTypeRef :Unmanaged<AnyObject>?

// Search for the keychain items
let status: OSStatus = SecItemCopyMatching(keychainQuery, &dataTypeRef)

var contentsOfKeychain: NSString?

if status == errSecSuccess {
    let retrievedData = Unmanaged<NSData>.fromOpaque(op).takeUnretainedValue()

    // Convert the data retrieved from the keychain into a string
    contentsOfKeychain = NSString(data: retrievedData, encoding: NSUTF8StringEncoding)
}
```

Otherwise, on release build, swift can't retrieve data from keychain with above code.  
This is related to `Swift compiler's Optimization Level`.

{% img center /images/2015/01/swift_compiler.png %}

So, first option is changing `Optimization Level` of Relase to be `None [-Onone]`.
But this drops code optimization, so following code is recommended.

```
var result: AnyObject?
var status = withUnsafeMutablePointer(&result) { SecItemCopyMatching(keychainQuery, UnsafeMutablePointer($0)) }

if status == errSecSeccess {
    if let data = result as NSData? {
        if let contentsOfKeychain = NSString(data: data, encoding: NSUTF8StringEncoding) {
            // ...
        }
    }
}
```

The point is to use `withUnsafeMutablePointer`, previous example we used `Unmanaged`.  
This should solve the issue.


refs:
http://stackoverflow.com/questions/26355630/swift-keychain-and-provisioning-profiles
