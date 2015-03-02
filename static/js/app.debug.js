(function() {
  (function() {
    var App;
    App = (function() {
      function App() {
        window.onload = (function(_this) {
          return function() {
            return _this.init();
          };
        })(this);
      }

      App.prototype.init = function() {
        var aberigle, letter;
        aberigle = this.dom("#hero");
        return aberigle.innerHTML = ((function() {
          var i, len, ref, results;
          ref = aberigle.innerHTML.split("");
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            letter = ref[i];
            results.push("<span id=\"" + (letter.toLowerCase()) + "\">" + letter + "</span>");
          }
          return results;
        })()).join("");
      };

      App.prototype.dom = function(selector) {
        var items;
        items = document.querySelectorAll(selector);
        if (items.length === 1) {
          return items[0];
        } else {
          return items;
        }
      };

      return App;

    })();
    return window.App = new App;
  })();

}).call(this);
