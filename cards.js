var cards = (function() {
  var opt = {
    cardSize: {
      width: 69,
      height: 94,
      padding: 18
    },
    animationSpeed: 500,
    table: 'body',
    cardback: 'red',
    type: 'WHOT',
    loop: 1
  };
  var zIndexCounter = 1;
  var all = []; // All the cards created.

  function mouseEvent(ev) {
    var card = $(this).data('card');
    if (card.container) {
      var handler = card.container._click;
      if (handler) {
        handler.func.call(handler.context || window, card, ev);
      }
    }
  }

  function init(options) {
    if (options) {
      for (var i in options) {
        if (opt.hasOwnProperty(i)) {
          opt[i] = options[i];
        }
      }
    }
    opt.table = $(opt.table)[0];
    if ($(opt.table).css('position') == 'static') {
      $(opt.table).css('position', 'relative');
    }
    for (let l = 0; l < opt.loop; l++) {
      var suits = ['Circles', 'Triangles', 'Stars', 'Crosses', 'Squares'];
      var ranks = {
        Circles: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14],
        Triangles: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14],
        Stars: [1, 2, 3, 4, 5, 7, 8],
        Crosses: [1, 2, 3, 5, 7, 10, 11, 13, 14],
        Squares: [1, 2, 3, 5, 7, 10, 11, 13, 14]
      };

      for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        var suit = suits[suitIndex];
        var suitRanks = ranks[suit];
        for (var rankIndex = 0; rankIndex < suitRanks.length; rankIndex++) {
          var rank = suitRanks[rankIndex];
          var imagePath = 'Media/' + suit + '/' + rank + suit.toLowerCase() + '.png';
          all.push(new Card(suit, rank, imagePath, opt.table));
        }
      }
    }

    $('.card').click(mouseEvent);
    shuffle(all);
  }

  function shuffle(deck) {
    // Fisher-Yates shuffle
    var i = deck.length;
    if (i == 0) return;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempi = deck[i];
      var tempj = deck[j];
      deck[i] = tempj;
      deck[j] = tempi;
    }
  }

  function Card(suit, rank, imagePath, table) {
    this.init(suit, rank, imagePath, table);
  }

  Card.prototype = {
    init: function(suit, rank, imagePath, table) {
      this.suit = suit;
      this.rank = rank;
      this.name = suit + ' ' + rank;
      this.imagePath = imagePath;
      this.container = table;
      this.$el = $('<div class="card ' + suit.toLowerCase() + '">' + rank + '</div>');
      this.$el.data('card', this);
      this.$el.css({
        position: 'absolute',
        width: opt.cardSize.width + 'px',
        height: opt.cardSize.height + 'px',
        cursor: 'pointer',
        'z-index': zIndexCounter++
      });
      table.appendChild(this.$el[0]);
      this.showCardBack();
    },
    showCardBack: function() {
      this.$el.css('background-color', opt.cardback);
    },
    showCardFront: function() {
      this.$el.css({
        'background-image': 'url(' + this.imagePath + ')',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
        'background-color': ''
      });
    },
    moveTo: function(x, y, speed) {
      this.$el.animate({
        top: y,
        left: x
      }, speed || opt.animationSpeed);
    },
    setSide: function(face) {
      if (face === 'front') {
        this.showCardFront();
      } else if (face === 'back') {
        this.showCardBack();
      }
    },
    flip: function() {
      if (this.isFaceDown()) {
        this.setSide('front');
      } else {
        this.setSide('back');
      }
    },
    isFaceDown: function() {
      return this.$el.css('background-color') !== 'transparent';
    }
  };

  return {
    init: init
  };
})();

$(document).ready(function() {
  cards.init();
  $('#deal-button').click(function() {
    $(this).prop('disabled', true).css('cursor', 'not-allowed');
    // Deal the cards between chosen amount of people here
  });
});
