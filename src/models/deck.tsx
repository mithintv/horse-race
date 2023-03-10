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
export const diamonds = new Map([
  ["Two", "🃂"],
  ["Three", "🃃"],
  ["Four", "🂤"],
  ["Five", "🃅"],
  ["Six", "🃆"],
  ["Seven", "🃇"],
  ["Eight", "🃈"],
  ["Nine", "🃉"],
  ["Ten", "🃊"],
  ["Jack", "🃋"],
  ["Queen", "🃍"],
  ["King", "🃎"],
  ["Ace", "🃁"],
]);
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

export class CardNode {
  constructor(card: CardSingle) {
    this.card = card;
    this.next = null;
  }
}

export class Deck {
  constructor(deck?: CardNode) {
    this.head = null;
    this.length = 0;

    if (deck) {
      this.head = deck;
      let current = deck;
      while (current.next !== null) {
        this.length++;
        current = current.next;
      }
    }
  }

  shuffle() {
    let wholeDeck = [...clubs];
    while (wholeDeck.length > 0) {
      let randomIndex = Math.floor(Math.random() * wholeDeck.length);
      this.push(wholeDeck[randomIndex]);
      wholeDeck = wholeDeck.filter(
        (card) => card.display !== wholeDeck[randomIndex].display
      );
    }
    return this;
  }

  push(card: CardSingle) {
    const cardNode = new CardNode(card);
    this.head ? (this.tail!.next = cardNode) : (this.head = cardNode);
    this.tail = cardNode;
    this.length++;
    return this;
  }

  draw() {
    if (!this.head) return null;
    const currHead = this.head;
    this.head = currHead.next;
    currHead.next = null;
    this.length--;
    if (this.length === 0) this.tail = null;
    return currHead;
  }
}

export interface Deck {
  head: null | CardNode;
  tail: null | CardNode;
  length: number;
}

export interface CardNode {
  card: CardSingle;
  next: null | CardNode;
}

export interface CardSingle {
  name: string;
  display: string;
  suit: string;
}

const deck = new Deck();
console.log(deck);
