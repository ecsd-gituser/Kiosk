var runApp = function() {
  if (chrome.power) {
    chrome.power.requestKeepAwake('display');
  }
  console.log(config);
  chrome.app.window.create('index.html',
    {
      id: 'KioskDesignerWindow',
      width: 1100,
      height: 720,
      minWidth: 800,
      minHeight: 600
    },
    function(win) {
      if (!this.X) { return; }
      var window = win.contentWindow;
      window.onload = function() {
        this.$addWindow(window);
        var Y = this.X.subWindow(window, 'Kiosk Designer Window');
        this.DOM.init(Y);
      }.bind(this);
      win.onClosed.addListener(function() {
        this.$removeWindow(window);
      }.bind(this));
    }.bind(this));
}.bind(this);

chrome.app.runtime.onLaunched.addListener(function() {
  runApp();
});

chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});
