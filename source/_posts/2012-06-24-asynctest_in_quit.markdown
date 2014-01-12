---
layout: post
title: ! '```Xcodeで非同期通信のテストを行う'
tags:
- Block
- GCD
- iOS
- WebDevelopment
- Xcode
status: publish
type: post
published: true
meta:
  _syntaxhighlighter_encoded: '1'
  _edit_last: '1'
  _sd_is_markdown: ''
---
最近はiPhoneアプリの開発を勉強しています。

で、iPhoneアプリを作る上でももちろんテストを書きたいと思い、いろいろ調べた結果、XCode4系標準のQUnit、非同期を簡単に扱えるGHUitあたりが有名だとわかりました(他にもたくさんあります)。

XCode標準ということはAppleの人たちもきっとQUitを使って開発しているはず！という勝手な思い込みからQUitを使うことにしました。
そのQUnitは標準で非同期をサポートしていないので、自前で非同期のテストを書かないといけません。
その実装をメモしておきます。

まずはコードから。
```
- (void)testAsyncronousRequest
{
  dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);

  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  asyncConnection = [[AsyncConnection alloc] initWithRequest:request]; 
  //Automatically asyncConnection.delegate is set asyncConnection in AsyncConnection

  asyncConnection.completion = ^(JSONConnection *connection,
                                  NSData *downloadData,
                                  NSHTTPURLResponse* response,
                                  NSError* error) {
        // Test code here..
    
        dispatch_semaphore_signal(semaphore);
    };
    
    
    while (dispatch_semaphore_wait(semaphore, DISPATCH_TIME_NOW)) {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode 
                                 beforeDate:[NSDate dateWithTimeIntervalSinceNow:5]];
    } 

    dispatch_release(semaphore);
}
```

まず、
```
  dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
```
でセマフォをプールサイズ0で登録します。

その後、
```
while (dispatch_semaphore_wait(semaphore, DISPATCH_TIME_NOW)) {
 [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode 
                             beforeDate:[NSDate dateWithTimeIntervalSinceNow:5]];
} 
```

でセマフォのカウンタが0の時は
```
[[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode 
                           beforeDate:[NSDate dateWithTimeIntervalSinceNow:5]];
```
を実行してメインループをブロックします。
ブロックしている間にasyncConnection.completionのブロックで指定した関数が実行され、
```
dispatch_semaphore_signal(semaphore);
```
によってセマフォのカウンタが1インクリメントされます。
セマフォのカウンタが1以上だった、もしくは待機中にカウンタが1以上になった場合は
```
dispatch_semaphore_wait(semaphore, DISPATCH_TIME_NOW)
```
が0になり、while文を抜け出し、セマフォを開放した後、testAsyncronousRequestが終了します。

こんなかんじでGCDを使って非同期テストを行うことができました。

GCDについて詳しくは
<div class="amazlet-box" style="margin-bottom:0px;"><div class="amazlet-image" style="float:left;margin:0px 12px 1px 0px;"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4844331094/yasuoza-22/ref=nosim/" name="amazletlink" target="_blank"><img src="http://ecx.images-amazon.com/images/I/41FcW2yiPXL._SL160_.jpg" alt="エキスパートObjective-Cプログラミング －iOS/OS Xのメモリ管理とマルチスレッド－" style="border: none;" /></a></div><div class="amazlet-info" style="line-height:120%; margin-bottom: 10px"><div class="amazlet-name" style="margin-bottom:10px;line-height:120%"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4844331094/yasuoza-22/ref=nosim/" name="amazletlink" target="_blank">エキスパートObjective-Cプログラミング －iOS/OS Xのメモリ管理とマルチスレッド－</a><div class="amazlet-powered-date" style="font-size:80%;margin-top:5px;line-height:120%">posted with <a href="http://www.amazlet.com/browse/ASIN/4844331094/yasuoza-22/ref=nosim/" title="エキスパートObjective-Cプログラミング －iOS/OS Xのメモリ管理とマルチスレッド－" target="_blank">amazlet</a> at 12.06.24</div></div><div class="amazlet-detail">坂本 一樹 <br />インプレスジャパン <br />売り上げランキング: 119084<br /></div><div class="amazlet-sub-info" style="float: left;"><div class="amazlet-link" style="margin-top: 5px"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4844331094/yasuoza-22/ref=nosim/" name="amazletlink" target="_blank">Amazon.co.jp で詳細を見る</a></div></div></div><div class="amazlet-footer" style="clear: left"></div></div>

<br/>

<strong>参考サイト</strong>
<ul>
	<li>元ネタ: <a href="http://stackoverflow.com/questions/4326350/how-do-i-wait-for-an-asynchronously-dispatched-block-to-finish" title="How do I wait for an asynchronously dispatched block to finish?" target="_blank">How do I wait for an asynchronously dispatched block to finish?</a>
</li>
	<li><a href="http://developer.apple.com/library/ios/#documentation/General/Conceptual/ConcurrencyProgrammingGuide/OperationQueues/OperationQueues.html#//apple_ref/doc/uid/TP40008091-CH102-SW24" target="_blank">Using Dispatch Semaphores to Regulate the Use of Finite Resources</a></li>

	<li><a href="http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/NSRunLoop_Class/Reference/Reference" target="_blank">runMode:beforeDate</a></li>
</ul>
