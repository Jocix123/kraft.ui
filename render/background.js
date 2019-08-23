/**
 * @file: background.js
 * @description: app bootstrapper for Chrome OS
 * @license: MIT
 * @author: Loouis Low <loouis@gmail.com>
 * @copyright: Loouis Low (https://github.com/loouislow81/kraft.ui)
 */

chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {
    id: "fileWin",
    bounds: {
      width: 800,
      height: 500
    }
  }, function(win) {
    win.contentWindow.launchData = launchData;
  });
});
