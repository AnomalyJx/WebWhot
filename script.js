// document.addEventListener('DOMContentLoaded', function() {
//   cards.init({ table: '#card-table' });
//   var deck = new cards.Deck(); // Create a new deck
//   deck.addCards(cards.all);
//   deck.render({ immediate: true });

//   // Create hands
//   var player1Hand = new cards.Hand({ faceUp: true, y: 350 });
//   var player2Hand = new cards.Hand({ faceUp: false, y: 50 });
//   var player3Hand = new cards.Hand({ faceUp: false, x: 83, y: 200 });

//   // Handle the "Deal" button click event
//   var dealButton = document.getElementById("deal-button");
//   dealButton.addEventListener("click", function() {
//     deck.deal(6, [player1Hand, player3Hand, player2Hand], 200);

//     // Disable the "Deal" button
//     dealButton.disabled = true;
//     dealButton.classList.add("disabled");
//   });
// });


document.addEventListener('DOMContentLoaded', function() {
  cards.init({ table: '#card-table' });
  var deck = new cards.Deck(); // Create a new deck
  deck.addCards(cards.all);
  deck.render({ immediate: true });

  // Create hands
  var player1Hand = new cards.Hand({ faceUp: true, y: 350 });
  var player2Hand = new cards.Hand({ faceUp: false, y: 50 });
  var player3Hand = new cards.Hand({ faceUp: false, x: 83, y: 200 });

  // Handle the "Deal" button click event
  var dealButton = document.getElementById("deal-button");
  dealButton.addEventListener("click", function() {
    deck.deal(6, [player1Hand, player3Hand, player2Hand], 200);

    // Add rotate class to player3Hand
    player3Hand.el.classList.add("rotate");

    // Disable the "Deal" button
    dealButton.disabled = true;
    dealButton.classList.add("disabled");
  });
});
