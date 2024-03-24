import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CardInput, CardsResponse, SheetInput } from './card.dto';
import { Card } from './card.model';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getAllCardPosts(@Query() query: ExpressQuery): Promise<CardsResponse> {
    const cards = await this.cardService.getCards(query);
    const cardCount = cards.length;
    return { cardCount, cards } as CardsResponse;
  }

  @Post('addOne')
  async createCard(@Body() card: CardInput): Promise<Card> {
    return await this.cardService.createCard(card);
  }

  @Patch('updateOne/:id')
  async updateCard(
    @Param('id') cardId: string,
    @Body() cardInput: CardInput,
  ): Promise<any> {
    if (!cardId) {
      throw new BadRequestException(
        'cardId is empty. Please pass a valid cardId',
      );
    }
    return await this.cardService.updateCard(cardId, cardInput);
  }

  @Patch('updateSheet/:id')
  async updateSheet(
    @Param('id') sheetId: string,
    @Body() sheet: SheetInput,
  ): Promise<any> {
    if (!sheetId) {
      throw new BadRequestException(
        'sheetId is empty. Please pass a valid sheetId',
      );
    }
    return await this.cardService.updateSheet(sheetId, sheet);
  }

  @Delete()
  async deleteAll(@Query() query: ExpressQuery): Promise<number> {
    const deletedCount = this.cardService.deleteAll();
    return deletedCount;
  }
}
