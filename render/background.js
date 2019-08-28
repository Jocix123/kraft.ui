chrome.app.runtime.onLaunched.addListener(function(n){chrome.app.window.create("index.html",{id:"fileWin",bounds:{width:800,height:500}},function(e){e.contentWindow.launchData=n})});
