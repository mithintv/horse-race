import { shuffleDeck, fullDeck } from "../models/deck";
import type { SuitDeck } from "../models/types";

export default function deckReducer(
  state: { order: SuitDeck; rungs: SuitDeck },
  action: { type: string }
) {
  if (action.type === "SHUFFLE") {
    const { order, rungs } = shuffleDeck(fullDeck);
    return { order, rungs };
  }
  if (action.type === "DRAW") {
    const deck = { ...state };
    deck.order.pop();
    return {
      order: deck.order,
      rungs: deck.rungs,
    };
  }
  return state;
}
