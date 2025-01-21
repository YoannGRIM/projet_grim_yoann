import { Injectable, signal } from '@angular/core';
import { Card } from '../../shared/models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards = signal<Card[]>([]);

  get cardsSignal() {
    return this.cards;
  }

  addCard(newCard: Card) {
    this.cards.update((cards) => [...cards, newCard]);
  }

  deleteCard(cardNumber: number) {
    this.cards.update((cards) => cards.filter((card) => card.cardNumber !== cardNumber));
  }
}
