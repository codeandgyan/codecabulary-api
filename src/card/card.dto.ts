import { Card, Sheet } from './card.model';

export class CardsResponse {
  cardCount: number;
  cards: Card[];
}

export class CardInput {
  headline: string;
  logoUrl: string;
  tags: string;
  sheets: SheetInput[];
}

export class CardUpdateInput {
  headline: string;
  logoUrl: string;
  tags: string;
}

export class SheetInput {
  contentUrl?: string;
  title: string;
  tags: string;
  content?: string;
  referenceLink?: string;
}
