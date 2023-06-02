document.addEventListener('DOMContentLoaded', function() {
  cards.init({ table: '#card-table' });
  var deck = new cards.Deck(); // Create a new deck
  deck.addCards(cards.all);
  deck.render({ immediate: true });

  // Create hands
  var upperhand = new cards.Hand({ faceUp: false, y: 50 });
  var lowerhand = new cards.Hand({ faceUp: true, y: 350 });

  // Handle the "Deal" button click event
  var dealButton = document.getElementById("deal-button");
  dealButton.addEventListener("click", function() {
    deck.deal(5, [upperhand, lowerhand], 50);

    // Disable the "Deal" button
    dealButton.disabled = true;
    dealButton.classList.add("disabled");
  });
});
