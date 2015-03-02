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
        aberigle = this.dom("#aberigle");
        return aberigle.innerHTML = ((function() {
          var _i, _len, _ref, _results;
          _ref = aberigle.innerHTML.split("");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            letter = _ref[_i];
            _results.push("<span id=\"" + (letter.toLowerCase()) + "\">" + letter + "</span>");
          }
          return _results;
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
