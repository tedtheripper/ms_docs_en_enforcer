document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.getSelected(null, function (tab) {
    let url = tab.url;
    let ifMsDocs = ".*docs\.microsoft\.com.*";
    let regex = new RegExp(ifMsDocs);
    if (url.match(regex)) {
      let items = url.split("/");
      let languageRegex = "[a-z][a-z]-[a-z][a-z]";
      let lanReg = new RegExp(languageRegex);
      let mustReload = false;
      for (let i = 0; i < items.length; i++) {
        if (items[i].match(lanReg) && items[i].length == 5) {
          if(items[i] !== 'en-us'){
            items[i] = "en-us";
            mustReload = true;
          }
        }
      }
      let newUrl = items.join("/");
      if(mustReload){
        chrome.tabs.update(tab.id, { url: newUrl });
        document.getElementById("result").innerHTML = "Language changed";
      } else {
        document.getElementById("result").innerHTML = "Already in english";
      }
    } else {
      document.getElementById("result").innerHTML = "Not on ms docs website";
    }
  });
});
