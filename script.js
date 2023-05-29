// Execute the code on page load
window.addEventListener('DOMContentLoaded', (event) => {
  cards.init({table:'#card-table'});
  deck = new cards.Deck();
  deck.addCards(cards.all);
  deck.render({immediate:true});
});

