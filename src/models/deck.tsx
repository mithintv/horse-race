export const hearts = [
  { name: "Two", display: "🂲", suit: "hearts" },
  { name: "Three", display: "🂳", suit: "hearts" },
  { name: "Four", display: "🂴", suit: "hearts" },
  { name: "Five", display: "🂵", suit: "hearts" },
  { name: "Six", display: "🂶", suit: "hearts" },
  { name: "Seven", display: "🂷", suit: "hearts" },
  { name: "Eight", display: "🂸", suit: "hearts" },
  { name: "Nine", display: "🂹", suit: "hearts" },
  { name: "Ten", display: "🂺", suit: "hearts" },
  { name: "Jack", display: "🂻", suit: "hearts" },
  { name: "Queen", display: "🂽", suit: "hearts" },
  { name: "King", display: "🂾", suit: "hearts" },
  { name: "Ace", display: "🂱", suit: "hearts" },
];
export const spades = [
  { name: "Two", display: "🂢", suit: "spades" },
  { name: "Three", display: "🂣", suit: "spades" },
  { name: "Four", display: "🂤", suit: "spades" },
  { name: "Five", display: "🂥", suit: "spades" },
  { name: "Six", display: "🂦", suit: "spades" },
  { name: "Seven", display: "🂧", suit: "spades" },
  { name: "Eight", display: "🂨", suit: "spades" },
  { name: "Nine", display: "🂩", suit: "spades" },
  { name: "Ten", display: "🂪", suit: "spades" },
  { name: "Jack", display: "🂫", suit: "spades" },
  { name: "Queen", display: "🂭", suit: "spades" },
  { name: "King", display: "🂮", suit: "spades" },
  { name: "Ace", display: "🂡", suit: "spades" },
];
export const diamonds = [
  { name: "Two", display: "🃂", suit: "diamonds" },
  { name: "Three", display: "🃃", suit: "diamonds" },
  { name: "Four", display: "🃄", suit: "diamonds" },
  { name: "Five", display: "🃅", suit: "diamonds" },
  { name: "Six", display: "🃆", suit: "diamonds" },
  { name: "Seven", display: "🃇", suit: "diamonds" },
  { name: "Eight", display: "🃈", suit: "diamonds" },
  { name: "Nine", display: "🃉", suit: "diamonds" },
  { name: "Ten", display: "🃊", suit: "diamonds" },
  { name: "Jack", display: "🃋", suit: "diamonds" },
  { name: "Queen", display: "🃍", suit: "diamonds" },
  { name: "King", display: "🃎", suit: "diamonds" },
  { name: "Ace", display: "🃁", suit: "diamonds" },
];
export const clubs = [
  { name: "Two", display: "🃒", suit: "clubs" },
  { name: "Three", display: "🃓", suit: "clubs" },
  { name: "Four", display: "🃔", suit: "clubs" },
  { name: "Five", display: "🃕", suit: "clubs" },
  { name: "Six", display: "🃖", suit: "clubs" },
  { name: "Seven", display: "🃗", suit: "clubs" },
  { name: "Eight", display: "🃘", suit: "clubs" },
  { name: "Nine", display: "🃙", suit: "clubs" },
  { name: "Ten", display: "🃚", suit: "clubs" },
  { name: "Jack", display: "🃛", suit: "clubs" },
  { name: "Queen", display: "🃝", suit: "clubs" },
  { name: "King", display: "🃞", suit: "clubs" },
  { name: "Ace", display: "🃑", suit: "clubs" },
];

export const joker = { name: "Joker", display: "🃟", suit: "joker" };

export const fullDeck = [...clubs, ...diamonds, ...spades, ...hearts];

export const shuffleDeck = (fullDeck: suitDeck) => {
  let deck = [];
  while (fullDeck.length > 4) {
    let index = Math.floor(Math.random() * fullDeck.length);
    while (fullDeck[index].name === "Ace") {
      index = Math.floor(Math.random() * fullDeck.length);
    }
    deck.push(fullDeck[index]);
    fullDeck = fullDeck.filter(
      (card) => card.display !== fullDeck[index].display
    );
  }
  return deck;
};

export const shuffledDeck = shuffleDeck(fullDeck);

type suitDeck = {
  name: string;
  display: string;
  suit: string;
}[];
