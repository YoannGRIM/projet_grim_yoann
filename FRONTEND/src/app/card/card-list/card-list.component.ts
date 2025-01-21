import { Component, computed, signal } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  searchQuery = signal<string>('');
  filteredCards = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.cardService.cardsSignal().filter((card) =>
      card.cardName?.toLowerCase().includes(query));
  });

  constructor(private cardService: CardService) { }

  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  deleteCard(cardNumber: number) {
    this.cardService.deleteCard(cardNumber);
  }
}
