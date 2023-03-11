export const hearts = new Map([
  ["Two", "🂲"],
  ["Three", "🂳"],
  ["Four", "🂴"],
  ["Five", "🂵"],
  ["Six", "🂶"],
  ["Seven", "🂷"],
  ["Eight", "🂸"],
  ["Nine", "🂹"],
  ["Ten", "🂺"],
  ["Jack", "🂻"],
  ["Queen", "🂽"],
  ["King", "🂾"],
  ["Ace", "🂱"],
]);
export const spades = new Map([
  ["Two", "🂢"],
  ["Three", "🂣"],
  ["Four", "🂤"],
  ["Five", "🂥"],
  ["Six", "🂦"],
  ["Seven", "🂧"],
  ["Eight", "🂨"],
  ["Nine", "🂩"],
  ["Ten", "🂪"],
  ["Jack", "🂫"],
  ["Queen", "🂭"],
  ["King", "🂮"],
  ["Ace", "🂡"],
]);
export const diamonds = [
  { name: "Two", display: "🃂", suit: "diamonds" },
  { name: "Three", display: "🃃", suit: "diamonds" },
  { name: "Four", display: "🂤", suit: "diamonds" },
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

export const joker = new Map([["Joker", "🃟"]]);

export const fillDeck = (fullDeck: suitDeck) => {
  let deck = [];
  while (fullDeck.length > 0) {
    let index = Math.floor(Math.random() * fullDeck.length);
    deck.push(fullDeck[index]);
    fullDeck = fullDeck.filter(
      (card) => card.display !== fullDeck[index].display
    );
  }
  return deck;
};

export const clubDeck = fillDeck([...clubs, ...diamonds]);

type suitDeck = {
  name: string;
  display: string;
  suit: string;
}[];
