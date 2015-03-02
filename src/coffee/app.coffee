do ->
  class App

    constructor: -> window.onload = => do @init

    init: ->
      aberigle = @dom "#aberigle"
      aberigle.innerHTML = 
        (for letter in aberigle.innerHTML.split ""
          """<span id="#{letter.toLowerCase()}">#{letter}</span>""").join ""

    dom: (selector) ->
      items = document.querySelectorAll selector
      if items.length is 1 then items[0] else items

  window.App = new App
