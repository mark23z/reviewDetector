chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
      if (tab.url.indexOf("https://www.amazon.com/") != -1) {
        chrome.tabs.create({ url: "https://www.youtube.com/watch?v=_MCrNTYMF-8" });
      }
    }
  });

